/**
 * The delivery towns plotted on the Home coverage map (264:2930).
 *
 * NOT FROM FIGMA. The design's map is a flat screenshot of Google Maps with the
 * pins placed by hand, so it carries no coordinates. These are the real
 * positions of the towns the screenshot labels — which means a pin may sit a
 * little differently here than in the mockup, because the mockup's pins were
 * eyeballed rather than geocoded. Real map, real places.
 */
export interface CoverageLocation {
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
  /** The hub. Drawn larger, the way the design emphasises Makurdi. */
  readonly primary?: boolean;
  /**
   * Put the label above the pin instead of below. Adikpo and Vandeikya are only
   * 15km apart, so at this zoom one label lands on the other's pin.
   */
  readonly labelAbove?: boolean;
}

export const coverageLocations: readonly CoverageLocation[] = [
  { name: "Makurdi", lat: 7.7333, lng: 8.5333, primary: true },
  { name: "Naka", lat: 7.5833, lng: 8.2167 },
  { name: "Gboko", lat: 7.3167, lng: 9.0 },
  { name: "Zaki-Biam", lat: 7.4667, lng: 9.6 },
  { name: "Katsina-Ala", lat: 7.1667, lng: 9.2833 },
  { name: "Otukpo", lat: 7.1833, lng: 8.1333 },
  { name: "Aliade", lat: 7.3, lng: 8.5 },
  { name: "Adikpo", lat: 6.9167, lng: 9.1, labelAbove: true },
  { name: "Vandeikya", lat: 6.7833, lng: 9.0667 },
  { name: "Oju", lat: 6.8333, lng: 8.3833 },
];

/** The centre of the plotted towns, so the map and the link agree. */
export const coverageCenter = {
  lat: coverageLocations.reduce((t, l) => t + l.lat, 0) / coverageLocations.length,
  lng: coverageLocations.reduce((t, l) => t + l.lng, 0) / coverageLocations.length,
};

/** Fits every town in the 580 x 680 card. */
export const coverageZoom = 8;

/**
 * Opens Google Maps over the same area, in the same place the embedded map
 * starts. Google labels the towns itself at this zoom, so the destination shows
 * the coverage area rather than a single dropped pin.
 */
export const coverageMapsUrl = `https://www.google.com/maps/@${coverageCenter.lat.toFixed(4)},${coverageCenter.lng.toFixed(4)},${coverageZoom}z`;
