"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileMusic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadProps {
  onUpload?: (file: File) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setSelectedFile(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type === "audio/mpeg" || file.name.endsWith(".mp3")) {
        setSelectedFile(file)

        // Log file information to console
        console.log("File dropped:", {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type,
          lastModified: new Date(file.lastModified).toLocaleString(),
        })
      }
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUpload = () => {
    if (selectedFile && onUpload) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="w-full">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".mp3,audio/mpeg" className="hidden" />

      {!selectedFile ? (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium mt-2">Upload MP3 File</h3>
            <p className="text-sm text-muted-foreground mb-2">Drag and drop your MP3 file here, or click to browse</p>
            <Button variant="secondary" size="sm" onClick={handleButtonClick}>
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileMusic className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-full">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearSelectedFile}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={handleUpload}>Upload to Server</Button>
          </div>
        </div>
      )}
    </div>
  )
}
