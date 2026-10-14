import { ImageResponse } from "next/og";

export const alt =
  "Coach Conzo. Stronger bodies. No judgement. Fitness for life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#101114",
        color: "#f5f6f8",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 28, color: "#9dbff4", marginBottom: 32 }}>
        COACH CONZO / TRYHRD
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 800,
          display: "flex",
          flexDirection: "column",
          letterSpacing: -3,
        }}
      >
        <span>Stronger bodies.</span>
        <span>No judgement.</span>
        <span>Fitness for life.</span>
      </div>
    </div>,
    size,
  );
}
