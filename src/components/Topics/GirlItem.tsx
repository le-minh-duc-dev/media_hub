import { GirlType } from "@/types/girls.types"
import { Card, CardFooter, Image } from "@nextui-org/react"
import React from "react"

export default function GirlItem({ girl }: { girl: GirlType }) {
  return (
    <Card className="h-[250px]" isFooterBlurred>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={girl.url}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="">
          <h6 className="font-semibold line-clamp-2 w-full text-white dark:text-foreground">
            {girl.name}
          </h6>
          <div
            dangerouslySetInnerHTML={{ __html: girl.description }}
            className=" line-clamp-2 w-full text-white dark:text-foreground"
          ></div>
        </div>
      </CardFooter>
    </Card>
  )
}
