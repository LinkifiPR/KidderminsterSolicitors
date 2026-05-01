import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "./CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows first-time visitors accept, reject, and manage choices", async () => {
    render(<CookieConsent />);

    expect(
      await screen.findByText(/we use cookies to make this site work/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept all/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reject non-essential/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /manage preferences/i }),
    ).toBeInTheDocument();
  });

  it("stores analytics and marketing as false when rejecting non-essential cookies", async () => {
    render(<CookieConsent />);

    fireEvent.click(
      await screen.findByRole("button", { name: /reject non-essential/i }),
    );

    expect(JSON.parse(localStorage.getItem("cookie-consent") || "{}")).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  });
});
