import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

/**
 * The social share card, one per page, rendered at build time.
 *
 * Not from Figma — the design has no share-card frame. It is composed from the
 * design's own parts: the cream canvas, the Primary Green strip the footer CTA
 * sits on, the wordmark, each page's hero headline (with its accent run in
 * Orange, since the hero's Accent Yellow is unreadable on cream) and the
 * page's mascot.
 *
 * Satori, which renders these, cannot read woff2 or webp, so the fonts and
 * artwork are woff/png copies kept in `assets/og/` rather than the files the
 * site serves. Bitter stands in for Gelica here exactly as it does on the page.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Every read is scoped to assets/og/ — an unscoped path makes the build trace
// the whole project, public/ included, into the server output.
const asset = (name: string) => readFile(join(process.cwd(), "assets/og", name));
const dataUrl = async (name: string) =>
  `data:image/png;base64,${(await asset(name)).toString("base64")}`;

// Read once at module scope: none of it depends on the request.
const [bitterBold, interRegular, interSemiBold] = await Promise.all([
  asset("bitter-latin-700-normal.woff"),
  asset("inter-latin-400-normal.woff"),
  asset("inter-latin-600-normal.woff"),
]);
const wordmark = await dataUrl("wordmark.png");

export type OgArt = "home" | "vendors" | "riders" | "mark";

/** Intrinsic sizes of the trimmed artwork in assets/og/. */
const art: Record<OgArt, { width: number; height: number }> = {
  home: { width: 427, height: 343 },
  vendors: { width: 494, height: 460 },
  riders: { width: 382, height: 418 },
  mark: { width: 310, height: 300 },
};

interface OgCardOptions {
  eyebrow: string;
  /** The headline; `accent` is appended in Orange, as the hero draws its run. */
  title: string;
  accent?: string;
  description: string;
  art: OgArt;
}

const colors = {
  cream: "#f8f0dd",
  ink: "#071f10",
  forest: "#036729",
  brand: "#ea5220",
  subtext: "#4d4d4d",
};

function headlineWords(title: string, accent?: string) {
  const split = (text: string, isAccent: boolean) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, accent: isAccent }));
  return [...split(title, false), ...split(accent ?? "", true)];
}

export async function renderOgCard({
  eyebrow,
  title,
  accent,
  description,
  art: key,
}: OgCardOptions) {
  const image = await dataUrl(`${key}.png`);
  const { width, height } = art[key];
  // Artwork is fitted into the right-hand column, never enlarged past 1:1.
  const scale = Math.min(1, 420 / height, 440 / width);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: colors.cream,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flex: 1, padding: "56px 64px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 660 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori, not the DOM */}
          <img src={wordmark} width={184} height={60} alt="" />

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 24,
              fontWeight: 600,
              color: colors.brand,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            {eyebrow}
          </div>

          {/*
            Satori has no inline formatting context — an element with more than
            one child must be a flex container — so a two-colour headline is
            laid out as one flex item per word and wrapped.
          */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 12,
              fontFamily: "Bitter",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.2,
              color: colors.ink,
            }}
          >
            {headlineWords(title, accent).map((word, index) => (
              <span
                key={index}
                style={{ marginRight: 15, color: word.accent ? colors.brand : colors.ink }}
              >
                {word.text}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "block",
              marginTop: 20,
              fontSize: 26,
              lineHeight: 1.4,
              color: colors.subtext,
              lineClamp: 3,
            }}
          >
            {description}
          </div>
        </div>

        {/* Mascots stand on the green strip; the round mark floats centred. */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: key === "mark" ? "center" : "flex-end",
            justifyContent: "center",
            paddingBottom: key === "mark" ? 56 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori, not the DOM */}
          <img
            src={image}
            width={Math.round(width * scale)}
            height={Math.round(height * scale)}
            alt=""
          />
        </div>
      </div>

      {/* The footer CTA strip's Primary Green, carrying the served towns. */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 72,
          padding: "0 64px",
          background: colors.forest,
          color: "#ffffff",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex" }}>{siteConfig.servedCities.join("  ·  ")}</div>
        <div style={{ display: "flex" }}>{new URL(siteConfig.url).host}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Bitter", data: bitterBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
