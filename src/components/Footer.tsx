"use client"
import { useTheme } from "next-themes"
import Link from "next/link"
import dynamic from "next/dynamic"
const Image = dynamic(() => import("next/image"), { ssr: false })
export default function Footer() {
  const { theme } = useTheme()
  const target = ` Tổng hợp ảnh của hot girl, hot tiktoker, diễn viên, ca sĩ, người nổi
            tiếng, ảnh bikini, ảnh sexy, nóng bỏng. Nơi bổ sung vitamin A cho
            fan hâm mộ.`
  return (
    <div className="min-h-60 p-8 py-16  bg-content2 mt-24 flex flex-col justify-center ">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-8">
        <address className="">
          <ul className="space-y-2 ">
            <li className="text-2xl font-bold">Về Girl Xinh</li>
            <li>
              <Link href="/policy" className="hover:underline">
                Chính sách của chúng tôi
              </Link>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:girlxinhwebsite@gmail.com"
                className="hover:underline"
              >
                girlxinhwebsite@gmail.com
              </a>
            </li>
          </ul>
        </address>

        <div className=" flex-row gap-4 hidden lg:flex">
          <Image
            className="h-16 w-16"
            src={`/assets/images/logo_${
              theme?.includes("dark") ? "white" : "black"
            }_sm_300.png`}
            alt="logo"
            width="100"
            height="100"
          />
          <p className="text-lg">{target}</p>
        </div>
        <div className="flex flex-row gap-4 lg:hidden">
          <p>{target}</p>
          <Image
            className="h-16 w-16"
            src="/assets/images/logo_white_sm_300.png"
            alt="logo"
            width="100"
            height="100"
          />
        </div>
      </div>
    </div>
  )
}
