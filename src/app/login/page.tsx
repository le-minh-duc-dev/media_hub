import { signIn } from "@/authentication/auth"
import Login from "@/components/Login"
import { Metadata } from "next"
export async function generateMetadata(): Promise<Metadata> {
  const title = "Đăng nhập"
  const description = "Trang đăng nhập của " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/policy`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "policy",
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default function SignIn() {
  return (
    <Login
      signFn={async (provider:string) => {
        "use server"
        await signIn(provider)
        
      }}
    />
  )
}
