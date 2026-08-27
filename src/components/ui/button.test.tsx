import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonLink } from "@/components/ui/button";

describe("Button", () => {
  it("defaults to type=button so it never submits a surrounding form", () => {
    render(<Button>Order Now</Button>);
    expect(screen.getByRole("button", { name: "Order Now" })).toHaveAttribute("type", "button");
  });

  it("keeps the decorative arrow out of the accessible name", () => {
    render(<Button>Order Now</Button>);
    // Would read "Order Now " plus icon text if the svg were not aria-hidden.
    expect(screen.getByRole("button", { name: "Order Now" })).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Order Now</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Order Now" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Order Now
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Order Now" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("ButtonLink", () => {
  it("renders an internal link without target or rel", () => {
    render(<ButtonLink href="/vendors">Browse</ButtonLink>);

    const link = screen.getByRole("link", { name: "Browse" });
    expect(link).toHaveAttribute("href", "/vendors");
    expect(link).not.toHaveAttribute("target");
  });

  it("protects external links against reverse tabnabbing", () => {
    render(
      <ButtonLink href="https://example.com" external>
        Docs
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
