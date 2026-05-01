import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("contains the homepage, Phase 1 services, and trust pages", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://kidderminstersolicitors.co.uk");
    expect(urls).toContain(
      "https://kidderminstersolicitors.co.uk/conveyancing-solicitors-kidderminster/",
    );
    expect(urls).toContain(
      "https://kidderminstersolicitors.co.uk/editorial-policy/",
    );
  });
});
