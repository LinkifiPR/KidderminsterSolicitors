import { render, screen } from "@testing-library/react";
import ThankYouPage, { metadata } from "./page";

describe("ThankYouPage", () => {
  it("reassures users without promising legal advice", () => {
    render(<ThankYouPage />);

    expect(
      screen.getByRole("heading", {
        name: /thank you\. your enquiry has been received/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/suitable solicitor partner/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/not a law firm/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/legal advice from us/i)).not.toBeInTheDocument();
  });

  it("is configured as a conversion page rather than an indexable SEO page", () => {
    expect(metadata.alternates).toMatchObject({
      canonical: "https://kidderminstersolicitors.co.uk/thank-you/",
    });
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });
});
