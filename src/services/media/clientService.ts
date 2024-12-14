async function uploadFile(file:Blob) {
  const url = `https://api.cloudinary.com/v1_1/dqqetbr1m/upload`
  const fd = new FormData()
  fd.append("upload_preset", "llbkj5qc")
  fd.append("file", file)

  try {
    const res = await fetch(url, {
      method: "POST",
      body: fd,
    })
    const data = await res.json()

    return data.secure_url || ""
  } catch (error) {
    console.log(error);
    return ""
  }
}

export { uploadFile }
