#!/usr/bin/env node
/**
 * Pull a Figma file into design/ as JSON, plus its image fills.
 *
 *   pnpm figma:sync "https://www.figma.com/design/<key>/<name>"
 *   pnpm figma:sync <key> --nodes 264:2259,510:20048
 *   pnpm figma:sync <key> --render 264:2259 --format png --scale 2
 *   pnpm figma:sync <key> --images          # every image fill in the FILE
 *
 * The token is read from $FIGMA_TOKEN or ~/.figma-token and is never printed.
 * Output is written to design/<key>/ so it can be diffed between syncs — that
 * diff is the point: it shows exactly what the designer changed.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

const API = "https://api.figma.com/v1";

async function readToken() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  try {
    return (await readFile(path.join(homedir(), ".figma-token"), "utf8")).trim();
  } catch {
    console.error(
      "No Figma token. Set $FIGMA_TOKEN, or:\n" +
        "  echo 'figd_...' > ~/.figma-token && chmod 600 ~/.figma-token",
    );
    process.exit(1);
  }
}

/** Accepts a full figma.com URL or a bare file key. */
function parseFileKey(input) {
  if (!input) {
    console.error(
      "Usage: pnpm figma:sync <figma-url|fileKey> [--nodes ids] [--render ids] [--format svg|png] [--images]",
    );
    process.exit(1);
  }
  const match = input.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
  return match ? match[1] : input;
}

async function api(token, endpoint) {
  const res = await fetch(`${API}${endpoint}`, { headers: { "X-Figma-Token": token } });
  if (!res.ok) {
    // Never echo the token; the status is enough to diagnose.
    const hint =
      res.status === 403
        ? " — token lacks access to this file, or is not a valid read token"
        : res.status === 404
          ? " — file key not found"
          : "";
    throw new Error(`Figma API ${res.status} ${res.statusText}${hint}`);
  }
  return res.json();
}

const args = process.argv.slice(2);
const fileKey = parseFileKey(args[0]);
const flag = (name) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
};
const nodeIds = flag("--nodes");
const renderIds = flag("--render");
const format = flag("--format") ?? "svg";
const scale = flag("--scale") ?? "2";
/**
 * Image fills are per-FILE, not per-node, so a shared Figma file can hold
 * hundreds belonging to unrelated work. Downloading them is therefore opt-in;
 * to get artwork for specific frames, use --render, which asks Figma to
 * rasterise/vectorise just those nodes.
 */
const wantFills = args.includes("--images");

const token = await readToken();
const outDir = path.join("design", fileKey);
await mkdir(outDir, { recursive: true });

console.log(`Fetching ${nodeIds ? `nodes ${nodeIds}` : "full document"}…`);
const doc = nodeIds
  ? await api(token, `/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeIds)}`)
  : await api(token, `/files/${fileKey}`);

await writeFile(path.join(outDir, "document.json"), JSON.stringify(doc, null, 2));
console.log(`  → ${outDir}/document.json`);

if (renderIds) {
  const query = `ids=${encodeURIComponent(renderIds)}&format=${format}&scale=${scale}`;
  const rendered = await api(token, `/images/${fileKey}?${query}`);
  const renderDir = path.join(outDir, "renders");
  await mkdir(renderDir, { recursive: true });

  for (const [id, url] of Object.entries(rendered.images ?? {})) {
    if (!url) {
      console.warn(`  ! ${id}: Figma returned no render`);
      continue;
    }
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! ${id}: ${res.status}`);
      continue;
    }
    // Instance node ids look like "I264:2842;224:2982" — neither ':' nor ';'
    // is safe in a filename across shells and platforms.
    const name = `${id.replace(/[:;]/g, "-")}.${format}`;
    await writeFile(path.join(renderDir, name), Buffer.from(await res.arrayBuffer()));
    console.log(`  → ${renderDir}/${name}`);
  }
}

// Image fills are served as short-lived S3 URLs keyed by imageRef; if we fetch
// them at all, it must be now, because the URLs expire.
const refs = wantFills
  ? Object.entries((await api(token, `/files/${fileKey}/images`)).meta?.images ?? {})
  : [];

if (refs.length > 0) {
  const imageDir = path.join(outDir, "images");
  await mkdir(imageDir, { recursive: true });

  let saved = 0;
  // Modest concurrency: enough to be quick, not enough to get rate-limited.
  const queue = [...refs];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      for (let entry = queue.pop(); entry; entry = queue.pop()) {
        const [ref, url] = entry;
        if (!url) continue;
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`  ! ${ref}: ${res.status}`);
          continue;
        }
        const type = res.headers.get("content-type") ?? "";
        const ext = type.includes("png") ? "png" : type.includes("svg") ? "svg" : "jpg";
        await writeFile(path.join(imageDir, `${ref}.${ext}`), Buffer.from(await res.arrayBuffer()));
        saved++;
      }
    }),
  );
  console.log(`  → ${imageDir}/ (${saved} images)`);
}

console.log("Done.");
