import type { MetadataRoute } from "next";
import { palette } from "@/lib/palette";
import englishMessages from "../../messages/en.json";

/** The manifest is not localised, so it uses the default English copy. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Willian Justen",
    short_name: "Willian Justen",
    description: englishMessages.Metadata.description,
    start_url: "/",
    display: "browser",
    background_color: palette.background,
    theme_color: palette.background,
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
