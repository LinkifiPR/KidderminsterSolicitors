import { ImageResponse } from "next/og";

export const alt =
  "Kidderminster Solicitors — an independent local guide to finding trusted solicitors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #071827 0%, #0f3553 100%)",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "#C6A15B",
              color: "#071827",
              fontSize: "38px",
              fontWeight: 800,
            }}
          >
            KS
          </div>
          <div
            style={{
              marginLeft: "20px",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#C6A15B",
            }}
          >
            KIDDERMINSTER SOLICITORS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "66px", fontWeight: 800, lineHeight: 1.08 }}>
            Find trusted solicitors in Kidderminster
          </div>
          <div
            style={{
              marginTop: "22px",
              fontSize: "30px",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Compare local legal services and request a no obligation quote.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "24px", fontWeight: 600, color: "#C6A15B" }}>
          kidderminstersolicitors.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
