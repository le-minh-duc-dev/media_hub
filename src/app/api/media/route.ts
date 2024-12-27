import { protectUpdateContentApi } from "@/authentication/protect"
import {
  getApiKeyByCloudStorage,
  getApiNameByCloudStorage,
  getApiSecretByCloudStorage,
  getConfigByCloudStorage,
  getUploadPresetByCloudStorage,
} from "@/services/media/mediaService"
import { v2 } from "cloudinary"

export const POST = async (req: Request) => {
  const protectedHandler = await protectUpdateContentApi(
    async (req: Request) => {
      const { cloudStorage } = await req.json()
      console.log(cloudStorage)
      if (cloudStorage !== "default" && cloudStorage !== "v1") {
        return Response.json({ status: false })
      }
      const apiKey = getApiKeyByCloudStorage(cloudStorage)
      const apiName = getApiNameByCloudStorage(cloudStorage)

      v2.config(getConfigByCloudStorage(cloudStorage))

      const timestamp = Math.round(new Date().getTime() / 1000)
      const signature = v2.utils.api_sign_request(
        {
          timestamp: timestamp,
          upload_preset: getUploadPresetByCloudStorage(cloudStorage),
        },
        getApiSecretByCloudStorage(cloudStorage)!
      )

      return Response.json({
        signature: signature,
        timestamp: timestamp,
        cloudname: apiName,
        apiKey: apiKey,
      })
    }
  )

  return protectedHandler(req)
}
