// Type definition for song metadata
export interface SongMetadata {
  // Basic metadata
  id: string
  title: string
  artists: string[]
  albumArtist: string
  albums: string[]
  years: number[]
  genres: string[]
  trackNumber: number
  discNumber: number

  // Technical metadata
  duration: string
  bitrate: string
  sampleRate: string
  channels: number
  encoder: string
  fileSize: string

  // Additional metadata
  composers: string[]
  conductors: string[]
  publisher: string
  copyright: string
  isrc: string // International Standard Recording Code
  bpm: number
  key: string
  mood: string
  language: string

  // Comments and custom tags
  comments: string
  lyrics: string

  // File information
  paths: string[]
  lastModified: string
  playCount: number
  rating: number
}
