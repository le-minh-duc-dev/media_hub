import "./globals.css"
import "react-photo-view/dist/react-photo-view.css"
import { Providers } from "@/components/Providers"
import NavbarWrapper from "@/components/Navbar/NavbarWrapper"
import Footer from "@/components/Footer"
import { slogan } from "@/lib/statements"
export async function generateMetadata() {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    title: {
      default: "Girl xinh",
      template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    },
    description: slogan,
    generator: "Next.js",
    applicationName: "Girlxinh.fun",
    // referrer: 'origin-when-cross-origin',
    keywords: ["girl xinh", "girlxinh.fun", "bikini", "hot girl"],
    authors: [{ name: "Girl xinh", url: process.env.NEXT_PUBLIC_BASE_URL }],
    creator: "Girl xinh",
    publisher: "Girl xinh",
    icons: {
      icon: "/assets/images/logo.png",
      shortcut: "/assets/images/logo.png",
      apple: "/assets/images/logo.png",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <Providers>
          <NavbarWrapper />
          <main className="relative max-w-7xl container mx-auto px-6 min-h-[75vh]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
