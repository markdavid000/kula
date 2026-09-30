import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { submitContactForm } from "@/app/contact/actions";
import { buildContactEmail } from "@/lib/email";

const idle = { status: "idle" as const };

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  name: "Ada Okafor",
  email: "ada@example.com",
  message: "Do you deliver to Wadata?",
};

describe("submitContactForm", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("sends the message through Resend and reports success", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: "1" }), { status: 200 }));

    const result = await submitContactForm(idle, form(valid));

    expect(result).toEqual({ status: "success" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test_key");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["thekulaapp.info@gmail.com"]);
    expect(body.reply_to).toBe("ada@example.com");
    expect(body.text).toContain("Do you deliver to Wadata?");
  });

  it("does not report success when delivery fails, and keeps what was typed", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    fetchMock.mockResolvedValue(new Response("invalid key", { status: 401 }));

    const result = await submitContactForm(idle, form(valid));

    expect(result.status).toBe("error");
    expect(result.message).toContain("thekulaapp.info@gmail.com");
    expect(result.values).toEqual(valid);
  });

  it("falls back honestly when no API key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const result = await submitContactForm(idle, form(valid));

    expect(result.status).toBe("error");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns field errors with the typed values, and sends nothing", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");

    const result = await submitContactForm(idle, form({ ...valid, email: "not-an-email" }));

    expect(result.fieldErrors?.email).toBeDefined();
    expect(result.values?.message).toBe(valid.message);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an over-long message", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");

    const result = await submitContactForm(idle, form({ ...valid, message: "x".repeat(5001) }));

    expect(result.fieldErrors?.message).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");

    const result = await submitContactForm(idle, form({ ...valid, company: "Spam Inc" }));

    expect(result).toEqual({ status: "success" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("buildContactEmail", () => {
  it("escapes HTML and keeps line breaks out of the subject", () => {
    const email = buildContactEmail({
      name: "Eve\r\nBcc: victim@example.com",
      email: "eve@example.com",
      message: "<script>alert(1)</script>",
    });

    expect(email.subject).not.toMatch(/[\r\n]/);
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
  });
});
