"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import axios from "axios"
import { FileUpload } from "@/components/file-upload"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { isLoggedIn } from "@/lib/auth"
import { useRouter } from "next/router"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const router = useRouter()
  const handleFileUpload = async (file: File) => {
    console.log("File received in parent component:", file.name)
    const serverUrl = process.env.NEXT_PUBLIC_UPLOAD_SERVER_URL

    if (!serverUrl) {
      console.error(
        "Server URL not configured. Please set NEXT_PUBLIC_UPLOAD_SERVER_URL in your environment variables.",
      )
      setUploadStatus({
        success: false,
        message: "Server URL not configured. Please check your environment variables.",
      })
      return
    }

    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("file", file)

    try {
      setIsUploading(true)
      setUploadStatus(null)

      // Send the file to the server
      const response = await axios.post(serverUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // You can use this to show upload progress if needed
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          console.log(`Upload progress: ${percentCompleted}%`)
        },
      })

      console.log("Upload successful:", response.data)
      setUploadStatus({
        success: true,
        message: "File uploaded successfully!",
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadStatus({
        success: false,
        message: axios.isAxiosError(error)
          ? `Upload failed: ${error.response?.data?.message || error.message}`
          : "Upload failed. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload Music</h1>
          <p className="text-muted-foreground mb-8">
            Upload your MP3 files to add them to your music library.
          </p>
          {uploadStatus && (
            <Alert
              className={`mb-6 ${uploadStatus.success ? "border-green-500 text-green-500" : "border-destructive text-destructive"}`}
            >
              {uploadStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{uploadStatus.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{uploadStatus.message}</AlertDescription>
            </Alert>
          )}

          <FileUpload onUpload={handleFileUpload} />

          {isUploading && (
            <div className="flex items-center justify-center mt-6 gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Uploading file to server...</span>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
