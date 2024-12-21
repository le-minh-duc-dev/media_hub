import { slogan } from "@/lib/statements"
import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    short_name: "Girl xinh",
    description: slogan,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/assets/images/logo_500.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
