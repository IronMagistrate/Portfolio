import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og-card";
import { profile } from "@/content/site";

export const alt = `${profile.name}, ${profile.role}, ${profile.location}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow={`${profile.role} // ${profile.location}`} title="Complex problems, practical software." footer="Next.js · NestJS · TypeScript" />,
    size,
  );
}
