import { ImageResponse } from "next/og";

// Replaces the Next.js logo favicon from the starter: a lime square, as in the header mark.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <div style={{ width: 18, height: 18, background: "#c8ff00" }} />
      </div>
    ),
    size,
  );
}
