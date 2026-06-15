import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Stop Learning. Start Building.";
  const vertical = searchParams.get("vertical") ?? "";
  const tagline = searchParams.get("tagline") ?? "Teaching Execution, Not Theory";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0c0a0a",
          backgroundImage:
            "radial-gradient(ellipse 800px 400px at 50% 40%, rgba(230,57,70,0.12) 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 80px 80px, 80px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "4px",
              backgroundColor: "#e63946",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e63946",
            }}
          >
            {vertical || "YorkSims.com"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "1040px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? "64px" : "80px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 400,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                backgroundColor: "#e63946",
              }}
            />
            yorksims.com
          </div>
          <div>York Sims</div>
        </div>
      </div>
    ),
    { ...SIZE }
  );
}
