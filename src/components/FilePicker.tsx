import React, { useId, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { LocalFile } from "./Posts/Mutation/MutatePost";

export default function FilePicker({
  onPick,
  allowedTypes = ["image/*", "video/*"],
  maxSizeMB = 100,
  isDisabled = false,
  multiple = false,
}: Readonly<{
  onPick: (localFiles: LocalFile[]) => void;
  allowedTypes?: string[];
  maxSizeMB?: number;
  isDisabled?: boolean;
  multiple: boolean;
}>) {
  const uuid = useId();
  const [error, setError] = useState<string | null>(null);

  const isValidType = (fileType: string, allowedTypes: string[]) =>
    allowedTypes.some((type) =>
      type === "*" || type.endsWith("/*")
        ? fileType.startsWith(type.slice(0, -1))
        : fileType === type
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles: LocalFile[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const filesToProcess = multiple ? Array.from(files) : [files[0]];
    filesToProcess.forEach((file) => {
      if (isValidType(file.type, allowedTypes) && file.size <= maxSizeBytes) {
        validFiles.push({ file, id: uuidv4() });
      } else {
        setError(
          `Invalid file "${file.name}". Allowed types: ${allowedTypes.join(
            ", "
          )}. Max size: ${maxSizeMB}MB.`
        );
      }
    });

    if (validFiles.length > 0) {
      setError(null);
      onPick(validFiles);
    }
  };

  return (
    <div>
      <label
        htmlFor={uuid}
        className={`w-full aspect-square bg-content4 flex justify-center items-center cursor-pointer rounded-xl ${
          isDisabled ? "opacity-25" : ""
        }`}
      >
        <FaPlus />
      </label>
      <input
        type="file"
        multiple={multiple}
        id={uuid}
        className="hidden"
        accept={allowedTypes.join(",")}
        onChange={handleChange}
        disabled={isDisabled}
        aria-describedby={error ? `${uuid}-error` : undefined}
      />
      {error && (
        <p id={`${uuid}-error`} className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
