import React, { useId } from "react"
import { FaPlus } from "react-icons/fa"
import { LocalFile } from "./CreatePost"
import { v4 as uuidv4 } from "uuid"
export default function FilePicker({
  onPick,
  allowedTypes = ["image/png", "image/jpeg", "video/mp4"],
  maxSizeMB = 100,
  isDisabled = false,
}: Readonly<{
  onPick: (localfiles: LocalFile[]) => void
  allowedTypes?: string[]
  maxSizeMB?: number
  isDisabled?: boolean
}>) {
  const uuid = useId()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const validFiles: LocalFile[] = []
    const maxSizeBytes = maxSizeMB * 1024 * 1024

    Array.from(files).forEach((file) => {
      if (
        allowedTypes.includes(file.type) && // Check MIME type
        file.size <= maxSizeBytes // Check file size
      ) {
        validFiles.push({ file, id: uuidv4() })
      } else {
        console.warn(
          `File "${file.name}" is invalid. Allowed types: ${allowedTypes.join(
            ", "
          )}. Max size: ${maxSizeMB}MB.`
        )
      }
    })

    onPick(validFiles)
  }
  return (
    <div>
      <label
        htmlFor={uuid}
        className={` w-full aspect-square bg-content4 flex justify-center items-center cursor-pointer rounded-xl ${
          isDisabled ? "opacity-25" : ""
        }`}
      >
        <FaPlus />
      </label>

      <input
        type="file"
        multiple
        id={uuid}
        className="hidden"
        accept={allowedTypes.join(",")}
        onChange={handleChange}
        disabled={isDisabled}
      />
    </div>
  )
}
