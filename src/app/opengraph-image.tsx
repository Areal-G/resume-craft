import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resume Craft - Free resume builder and ATS resume checker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_SVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#4338CA"/><path d="M18.5 9.5h11v4.2l5.2 8.6c.5.8.6 1.8.3 2.7L29.4 37a2 2 0 0 1-1.8 1.2h-7.2A2 2 0 0 1 18.6 37L13 25c-.3-.9-.2-1.9.3-2.7l5.2-8.6z" fill="#FFFFFF"/><rect x="18.5" y="13.7" width="11" height="1.8" fill="#C7D2FE"/><circle cx="24" cy="26" r="2.6" fill="#4338CA"/><path d="M24 28.4v9.8" stroke="#4338CA" stroke-width="1.6" stroke-linecap="round"/></svg>`;

const Line = ({ width, strong }: { width: number; strong?: boolean }) => (
  <div
    style={{
      width,
      height: 14,
      borderRadius: 7,
      background: strong ? "#4338CA" : "#E0E7FF",
      marginTop: 14,
    }}
  />
);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#F5F5FF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* next/image is unsupported inside ImageResponse (Satori) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(LOGO_SVG)}`}
              width={84}
              height={84}
              alt=""
            />
            <div
              style={{
                display: "flex",
                marginLeft: 22,
                fontSize: 60,
                fontWeight: 800,
                color: "#111827",
              }}
            >
              Resume
              <span style={{ color: "#4338CA", marginLeft: 16 }}>Craft</span>
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 46,
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#1F2937",
            }}
          >
            Build a polished, ATS-friendly resume in minutes
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#4B5563" }}>
            Free · No sign up · Private to your browser
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 330,
            height: 430,
            padding: 34,
            background: "#FFFFFF",
            borderRadius: 18,
            boxShadow: "0 20px 50px rgba(93, 82, 217, 0.25)",
            borderTop: "12px solid #4338CA",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, color: "#4338CA" }}>
            Maya Okafor
          </div>
          <Line width={230} />
          <div
            style={{
              marginTop: 26,
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            WORK EXPERIENCE
          </div>
          <Line width={250} strong />
          <Line width={220} />
          <Line width={240} />
          <div
            style={{
              marginTop: 26,
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            SKILLS
          </div>
          <Line width={200} strong />
          <Line width={230} />
        </div>
      </div>
    ),
    size
  );
}
