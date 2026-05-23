import { render, screen } from "@testing-library/react";
import EcommerceTermsPage, { metadata } from "./page";

describe("EcommerceTermsPage", () => {
  it("renders the ecommerce terms service page through an explicit route", () => {
    render(<EcommerceTermsPage />);

    expect(
      screen.getByRole("heading", {
        name: /ecommerce terms solicitors/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/no obligation quote/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/not a law firm/i).length).toBeGreaterThan(0);
  });

  it("has canonical metadata for the production URL", () => {
    expect(metadata.alternates).toMatchObject({
      canonical: "https://kidderminstersolicitors.co.uk/ecommerce-terms-solicitors/",
    });
  });
});
