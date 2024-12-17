import React, { useId } from "react"
import { FaPlus } from "react-icons/fa"

export default function FilePicker({
  onPick,
  allowedTypes = ["image/png", "image/jpeg", "video/mp4"],
  maxSizeMB = 100,
}: Readonly<{
  onPick: (file: File[]) => void
  allowedTypes?: string[]
  maxSizeMB?: number
}>) {
  const uuid = useId()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const validFiles: File[] = []
    const maxSizeBytes = maxSizeMB * 1024 * 1024

    Array.from(files).forEach((file) => {
      if (
        allowedTypes.includes(file.type) && // Check MIME type
        file.size <= maxSizeBytes // Check file size
      ) {
        validFiles.push(file)
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
        className=" w-full aspect-square bg-content4 flex justify-center items-center cursor-pointer rounded-xl"
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
      />
    </div>
  )
}
