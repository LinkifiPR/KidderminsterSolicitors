import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("presents the site as a Kidderminster solicitors quote website", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /find trusted solicitors in kidderminster/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/no obligation quote/i).length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByText(/independent legal information site/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /request my no obligation quote/i,
      }),
    ).toBeInTheDocument();
  });
});
