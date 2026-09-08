import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Restaurant Efficiency Market",
    short_name: "REM",
    description:
      "Restaurant surplus and same-day SOS inventory for local operators.",
    start_url: "/marketplace",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#065f46",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
