"use client"

import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react"

export default function Login({
  signFn,
}: {
  signFn: (provider: string) => void
}) {
  return (
    <div className="flex w-full h-[75vh] justify-center items-center">
      <Card
        classNames={{
          base: "p-12",
          // body:"flex flex-col items-center"
        }}
      >
        <CardHeader>
          <h1 className="text-3xl mb-12 mx-auto font-semibold">Đăng nhập</h1>
        </CardHeader>
        <CardBody>
          <form
            action={() => {
              signFn("google")
            }}
          >
            <Button
              type="submit"
              variant="bordered"
              className="h-fit bg-content1 "
            >
              <div className="flex gap-x-6 p-2 items-center justify-between">
                <Image
                  src="/assets/images/google_icon.png"
                  alt="Google icon"
                  width={30}
                  height={30}
                />
                <div className="font-semibold">Sign in with Google</div>
                <div className=""></div>
              </div>
            </Button>
          </form>
          <form
            action={() => {
              signFn("github")
            }}
            className="mt-4"
          >
            <Button
              type="submit"
              variant="bordered"
              className="h-fit bg-content1 "
            >
              <div className="flex gap-x-6 p-2 items-center justify-between">
                <Image
                  src="/assets/images/github_icon.png"
                  alt="Github icon"
                  width={30}
                  height={30}
                />
                <div className="font-semibold">Sign in with Github</div>
                <div className=""></div>
              </div>
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
