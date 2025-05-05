import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const title = "Chính sách"
  const description = "Chính sách của " + process.env.NEXT_PUBLIC_SITE_NAME
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

export default function page() {
  return (
    <div className="lg:w-3/4 p-8 shadow-lg rounded-lg mx-auto">
      <h1 className="text-3xl text-center font-bold">
        {" "}
        Chính sách của <span className="text-nowrap">Media Hub</span>
      </h1>
      <ul className="pt-16">
        <li className="gap-y-2 mt-4">
          <h2 className="font-semibold ">🎯Mục đích của Media Hub:</h2>
          <p className="mt-2">
            Tuyển chọn những bức ảnh tuyệt đẹp của các thiếu nữ duyên dáng và
            xinh xắn.
          </p>
        </li>
        <li className=" gap-y-2 mt-4">
          <h2 className="font-semibold ">🎯Quyền sở hữu hình ảnh, video:</h2>
          <p className="mt-2">
            Tất cả hình ảnh, video có trong các bài viết trên website có quyền
            sở hữu thuộc về các cô gái có trong ảnh. Mọi yêu cầu đến quyền sở
            hữu hình ảnh, video trên website sẽ được tiếp nhận thông qua email:{" "}
            <a
              href="mailto:admin@ducle.online"
              className="font-semibold underline"
            >
              admin@ducle.online
            </a>
          </p>
        </li>
      </ul>
    </div>
  )
}
