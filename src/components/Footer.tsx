"use client"
import Link from "next/link"
import dynamic from "next/dynamic"
import { slogan } from "@/lib/statements"
const Image = dynamic(() => import("next/image"), { ssr: false })
export default function Footer() {
 

  return (
    <div className="min-h-60 p-8 py-16  bg-content2 mt-24 flex flex-col justify-center ">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-8">
        <address className="">
          <ul className="space-y-2 ">
            <li className="text-2xl font-bold">Về Media Hub</li>
            <li>
              <Link href="/policy" className="hover:underline">
                Chính sách của chúng tôi
              </Link>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:admin@ducle.online"
                className="hover:underline"
              >
                admin@ducle.online
              </a>
            </li>
          </ul>
        </address>

        <div className=" flex-row gap-4 hidden lg:flex">
          <h3 className="font-bold text-lg text-nowrap">Media Hub</h3>
          <p className="text-lg">{slogan}</p>
        </div>
        <div className="flex flex-row gap-4 lg:hidden">
          <p>{slogan}</p>
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
