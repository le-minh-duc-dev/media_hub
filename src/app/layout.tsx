import "./globals.css"
import "react-photo-view/dist/react-photo-view.css"
import { Providers } from "@/components/Providers"
import NavbarWrapper from "@/components/Navbar/NavbarWrapper"
import Footer from "@/components/Footer"
import { slogan } from "@/lib/statements"
import NotificationManager from "@/components/Notifications/NotificationManager"
export async function generateMetadata() {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    title: {
      default: "Media Hub",
      template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    },
    description: slogan,
    generator: "Next.js",
    applicationName: "Girlxinh.fun",
    // referrer: 'origin-when-cross-origin',
    keywords: ["Media Hub", ],
    authors: [{ name: "Media Hub", url: process.env.NEXT_PUBLIC_BASE_URL }],
    creator: "Media Hub",
    publisher: "Media Hub",
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
        <NotificationManager/>
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
