import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 86400;

const SIZE = { width: 1200, height: 630 };

const VOLT = "#D8FF3E";
const NAVY = "#0A1628";
const CREAM = "#F4EFE6";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: NAVY,
          color: CREAM,
          padding: 72,
          position: "relative",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Reticle mark + site, top left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M3 8V3H8" stroke={CREAM} strokeWidth="2.4" />
            <path d="M16 3H21V8" stroke={CREAM} strokeWidth="2.4" />
            <path d="M21 16V21H16" stroke={CREAM} strokeWidth="2.4" />
            <path d="M8 21H3V16" stroke={CREAM} strokeWidth="2.4" />
            <circle cx="12" cy="12" r="3" fill={VOLT} />
          </svg>
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Sponsorlens
          </span>
        </div>

        {/* Center: bracket-framed claim */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: "36px 44px",
            }}
          >
            {/* corner brackets */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 34, height: 34, borderLeft: `4px solid ${VOLT}`, borderTop: `4px solid ${VOLT}`, display: "flex" }} />
            <div style={{ position: "absolute", right: 0, top: 0, width: 34, height: 34, borderRight: `4px solid ${VOLT}`, borderTop: `4px solid ${VOLT}`, display: "flex" }} />
            <div style={{ position: "absolute", left: 0, bottom: 0, width: 34, height: 34, borderLeft: `4px solid ${VOLT}`, borderBottom: `4px solid ${VOLT}`, display: "flex" }} />
            <div style={{ position: "absolute", right: 0, bottom: 0, width: 34, height: 34, borderRight: `4px solid ${VOLT}`, borderBottom: `4px solid ${VOLT}`, display: "flex" }} />
            {/* detection tag */}
            <div
              style={{
                position: "absolute",
                top: -16,
                left: 44,
                background: VOLT,
                color: NAVY,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "4px 12px",
                display: "flex",
              }}
            >
              measured · 0.98
            </div>
            <span
              style={{
                fontSize: 104,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                color: "#FFFFFF",
                display: "flex",
              }}
            >
              Measured,
            </span>
            <span
              style={{
                fontSize: 104,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                color: "rgba(244,239,230,0.55)",
                display: "flex",
              }}
            >
              not estimated.
            </span>
          </div>
        </div>

        {/* Bottom chyron — the measurement promise, no implied clients */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(244,239,230,0.18)",
            paddingTop: 28,
            color: "rgba(244,239,230,0.62)",
            fontSize: 19,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex" }}>
            sponsorlens.io · sponsor exposure, measured daily
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: VOLT,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 10,
                height: 10,
                background: VOLT,
              }}
            />
            <span style={{ display: "flex" }}>reported mondays 07:00</span>
          </span>
        </div>
      </div>
    ),
    SIZE
  );
}
