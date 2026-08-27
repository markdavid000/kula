import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VendorCard } from "@/components/vendor-card";

const vendor = {
  name: "Chicken Republic",
  priceFrom: "Meals from ₦2,200+",
  href: "/vendors",
} as const;

describe("VendorCard", () => {
  it("exposes exactly one link, named after the vendor", () => {
    render(<VendorCard vendor={vendor} />);

    // The visible "View" affordance must not add a second tab stop or a
    // second, context-free link name.
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("Chicken Republic");
  });

  it("renders the vendor as a heading so the card is navigable by structure", () => {
    render(<VendorCard vendor={vendor} />);
    expect(screen.getByRole("heading", { name: "Chicken Republic" })).toBeInTheDocument();
  });

  it("shows the price band", () => {
    render(<VendorCard vendor={vendor} />);
    expect(screen.getByText("Meals from ₦2,200+")).toBeInTheDocument();
  });
});
