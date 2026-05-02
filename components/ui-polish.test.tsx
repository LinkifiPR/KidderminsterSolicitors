import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "../app/page";
import { QuoteForm } from "./QuoteForm";
import { SiteHeader } from "./SiteHeader";

describe("UI polish", () => {
  it("keeps the full header sticky", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toHaveClass("sticky");
  });

  it("uses the compact premium form and custom legal matter picker", () => {
    render(<QuoteForm />);

    expect(screen.getByRole("form", { name: /quote request/i })).toHaveClass(
      "quote-form-card",
    );
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

    const picker = screen.getByRole("button", {
      name: /legal matter type conveyancing/i,
    });

    expect(picker).toHaveClass("legal-matter-trigger");
    fireEvent.click(picker);

    const options = screen.getByRole("listbox", { name: /legal matter type/i });
    expect(options).toHaveClass("legal-matter-listbox");
    expect(
      within(options).getByRole("option", { name: /probate/i }),
    ).toHaveClass("legal-matter-option");

    fireEvent.click(within(options).getByRole("option", { name: /probate/i }));

    expect(
      screen.getByRole("button", { name: /legal matter type probate/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders the polished FAQ treatment on the homepage", () => {
    const { container } = render(<Home />);

    expect(container.querySelector(".faq-panel")).toBeInTheDocument();
    expect(container.querySelector(".faq-item")).toBeInTheDocument();
  });

  it("removes public featured partner placeholders from the homepage", () => {
    render(<Home />);

    expect(screen.queryByText(/featured solicitor partner/i)).not.toBeInTheDocument();
    expect(screen.getByText(/why use an independent local guide/i)).toBeInTheDocument();
  });
});
