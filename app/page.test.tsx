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
      screen.getAllByText(/independent local solicitor guide/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", {
        name: /request my quote/i,
      }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/we review your enquiry/i).length).toBeGreaterThan(
      0,
    );
    expect(screen.queryByText(/kit/i)).not.toBeInTheDocument();
  });
});
