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
        Chính sách của <span className="text-nowrap">Girl Xinh</span>
      </h1>
      <ul className="pt-16">
        <li className="gap-y-2 mt-4">
          <h2 className="font-semibold ">🎯Mục đích của Girl Xinh:</h2>
          <p className="mt-2">
            Tổng hợp ảnh của hot girl, hot tiktoker, diễn viên, ca sĩ, người nổi
            tiếng, ảnh bikini, ảnh sexy, nóng bỏng chất lượng cao. Nơi bổ sung
            vitamin A cho fan hâm mộ.
          </p>
        </li>
        <li className=" gap-y-2 mt-4">
          <h2 className="font-semibold ">🎯Quyền sở hữu hình ảnh, video:</h2>
          <p className="mt-2">
            Tất cả hình ảnh, video có trong các bài viết trên website Girl Xinh
            có quyền sở hữu thuộc về các girl xinh có trong ảnh. Mọi yêu cầu đến
            quyền sở hữu hình ảnh, video trên website Girl Xinh sẽ được tiếp
            nhận thông qua email:{" "}
            <a
              href="mailto:girlxinhwebsite@gmail.com"
              className="font-semibold underline"
            >
              girlxinhwebsite@gmail.com
            </a>
          </p>
        </li>
      </ul>
    </div>
  )
}
