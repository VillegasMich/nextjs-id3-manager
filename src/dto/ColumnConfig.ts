import { SongMetadata } from "./SongMetadata"

export interface ColumnConfig {
  key: keyof SongMetadata
  label: string
  category: "basic" | "technical" | "additional" | "custom" | "file"
  defaultVisible: boolean
  render?: (value: never) => React.ReactNode
}
