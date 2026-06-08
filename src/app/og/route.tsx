import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 86400;

const SIZE = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0A1628 0%, #0F1A2E 45%, #0c4a6e 100%)",
          color: "#F4EFE6",
          padding: 80,
          position: "relative",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Soft cyan bloom in upper area */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: 600,
            background:
              "radial-gradient(circle at 50% 50%, rgba(184, 151, 90, 0.32), transparent 65%)",
            display: "flex",
          }}
        />

        {/* Lens mark, top right */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#B8975A"
              strokeWidth="2"
              strokeDasharray="2 1.5"
              opacity="0.7"
            />
            <circle
              cx="12"
              cy="12"
              r="6"
              fill="none"
              stroke="#B8975A"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
          </svg>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "rgba(244,239,230,0.55)",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            sponsorlens.io
          </span>
        </div>

        {/* Center copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.24em",
              color: "#B8975A",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Sponsor intelligence platform
          </span>
          <span
            style={{
              fontSize: 116,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
              color: "#FFFFFF",
              display: "flex",
            }}
          >
            Sponsorlens
          </span>
          <span
            style={{
              fontSize: 38,
              fontWeight: 400,
              color: "rgba(203, 213, 225, 0.85)",
              letterSpacing: "-0.01em",
              maxWidth: 920,
              display: "flex",
            }}
          >
            Sponsor intelligence, lived in real time.
          </span>
        </div>

        {/* Bottom, leagues line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(244,239,230,0.55)",
            fontSize: 22,
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ display: "flex" }}>
            Built for the teams behind LaLiga · Serie A · Ligue 1 · Bundesliga
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#B8975A",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#B8975A",
              }}
            />
            <span style={{ display: "flex" }}>Live · 2026</span>
          </span>
        </div>
      </div>
    ),
    SIZE
  );
}
