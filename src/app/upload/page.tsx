"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"

export default function UploadPage() {
  const handleFileUpload = (file: File) => {
    // This function would normally process the file
    // For now, we're just logging to the console in the FileUpload component
    console.log("File received in parent component:", file.name)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload Music</h1>
          <p className="text-muted-foreground mb-8">
            Upload your MP3 files to add them to your music library. The file information will be logged to the console.
          </p>

          <FileUpload onUpload={handleFileUpload} />

        </div>
      </main>
      <Footer />
    </div>
  )
}
