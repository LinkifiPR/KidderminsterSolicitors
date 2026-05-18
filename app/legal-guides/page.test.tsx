import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import LegalGuidesPage, { metadata } from "./page";

describe("LegalGuidesPage", () => {
  it("renders a guide hub with grouped supporting guides", () => {
    render(<LegalGuidesPage />);

    expect(
      screen.getByRole("heading", {
        name: /legal guides for kidderminster solicitor enquiries/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /conveyancing and property/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /probate, wills and later-life planning/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /how much do conveyancing solicitors cost in kidderminster/i,
      }),
    ).toHaveAttribute(
      "href",
      "/legal-guides/how-much-do-conveyancing-solicitors-cost-in-kidderminster",
    );
  });

  it("has canonical metadata for the guide hub", () => {
    expect(metadata.alternates).toMatchObject({
      canonical: "https://kidderminstersolicitors.co.uk/legal-guides/",
    });
  });
});
