import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import { FeaturedPartner } from "./FeaturedPartner";
import { QuoteForm } from "./QuoteForm";
import { SiteHeader } from "./SiteHeader";

describe("UI polish", () => {
  it("keeps the full header sticky", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toHaveClass("sticky");
  });

  it("uses the compact premium form and custom select treatment", () => {
    render(<QuoteForm />);

    expect(screen.getByRole("form", { name: /quote request/i })).toHaveClass(
      "quote-form-card",
    );
    expect(screen.getByLabelText(/legal matter type/i)).toHaveClass(
      "form-select",
    );
  });

  it("uses a readable featured partner CTA", () => {
    render(<FeaturedPartner />);

    expect(screen.getByRole("link", { name: /request a quote/i })).toHaveClass(
      "partner-cta",
    );
  });

  it("renders the polished FAQ treatment on the homepage", () => {
    const { container } = render(<Home />);

    expect(container.querySelector(".faq-panel")).toBeInTheDocument();
    expect(container.querySelector(".faq-item")).toBeInTheDocument();
  });
});
