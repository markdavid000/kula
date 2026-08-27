"use client";

import type { Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";

import { coverageCenter, coverageLocations, coverageZoom } from "@/content/coverage";

import "leaflet/dist/leaflet.css";

/**
 * The live coverage map behind the "Order anywhere, we deliver everywhere" card
 * (264:2930).
 *
 * DIRECTED — the design ships a flat screenshot of Google Maps. This is a real
 * slippy map instead: pan and zoom work, and the pins are plotted from real
 * coordinates rather than placed by eye.
 *
 * Leaflet over CARTO's Voyager raster tiles, chosen because it needs no API key.
 * The Google Maps Embed API would match the mockup's cartography exactly, but it
 * bills against a key we do not have, and its iframe cannot carry custom pins —
 * the labelled markers are the whole point of this card. Attribution is required
 * by both OpenStreetMap and CARTO and is left in place.
 *
 * Leaflet touches `window` on import, so it is imported inside the effect rather
 * than at module scope, which would break the server render.
 *
 * Scroll-wheel zoom is off deliberately: the card is 680 tall and sits mid-page,
 * and a wheel-zooming map traps the page scroll as the reader passes over it.
 * Dragging and the +/- control still work.
 */

/** A Google-style teardrop. Authored: the mockup's pins are Google's own. */
function pinMarkup(name: string, primary: boolean, labelAbove: boolean) {
  const w = primary ? 34 : 26;
  const h = primary ? 46 : 35;
  const label = `<span style="
        ${labelAbove ? "margin-bottom" : "margin-top"}:1px;
        font-family:var(--font-inter),system-ui,sans-serif;
        font-size:${primary ? 15 : 13}px;
        font-weight:700;
        color:#202124;
        white-space:nowrap;
        text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff,0 0 3px #fff;
      ">${name}</span>`;
  return `
    <div style="display:flex;flex-direction:column;align-items:center;line-height:1">
      ${labelAbove ? label : ""}
      <svg width="${w}" height="${h}" viewBox="0 0 26 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 22 13 22s13-12.25 13-22c0-7.18-5.82-13-13-13Z" fill="#B31412"/>
        <circle cx="13" cy="12.6" r="4.8" fill="#ffffff"/>
      </svg>
      ${labelAbove ? "" : label}
    </div>`;
}

export function CoverageMap({ className }: { className?: string }) {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | undefined;

    void (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !holder.current) return;

      map = L.map(holder.current, {
        center: [coverageCenter.lat, coverageCenter.lng],
        zoom: coverageZoom,
        scrollWheelZoom: false,
        // Top-left is exactly where the card's 50px radius clips, so the
        // control moves to the corner the rounding leaves clear.
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: "bottomleft" }).addTo(map);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
        maxZoom: 19,
      }).addTo(map);

      for (const place of coverageLocations) {
        const primary = place.primary === true;
        const w = primary ? 34 : 26;
        const h = primary ? 46 : 35;
        L.marker([place.lat, place.lng], {
          // `divIcon` renders our own markup, which also sidesteps Leaflet's
          // default marker images breaking under a bundler.
          icon: L.divIcon({
            html: pinMarkup(place.name, primary, place.labelAbove === true),
            className: "",
            iconSize: [w, h],
            // Anchored at the point of the teardrop, not its centre.
            iconAnchor: [w / 2, h],
          }),
          // The label is decoration; the list of towns is in the page copy.
          keyboard: false,
          interactive: false,
        }).addTo(map);
      }

      /*
       * Frame to the pins rather than trusting a fixed centre and zoom: the card
       * is one aspect ratio at the canvas width and another below it, and
       * fitBounds keeps every town on screen at both. The padding keeps the
       * outermost labels off the card's rounded edge.
       */
      map.fitBounds(
        L.latLngBounds(coverageLocations.map((l) => [l.lat, l.lng] as [number, number])),
        { padding: [56, 56], maxZoom: 9 },
      );
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div ref={holder} className={className} aria-hidden />;
}
