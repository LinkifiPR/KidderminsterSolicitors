import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("presents the site as a coming-soon Kidderminster solicitors quote website", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /kidderminster solicitors/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/no-obligation legal quote/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/independent information site/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
