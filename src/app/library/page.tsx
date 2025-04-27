"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Columns, Filter, Play, Search, SortAsc, SortDesc } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { mockSongs } from "@/util/MockData"
import { SongMetadata } from "@/dto/SongMetadata"
import { Combobox } from "@/components/ui/combobox"
import { ColumnConfig } from "@/dto/ColumnConfig"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { isLoggedIn } from "@/lib/auth"
import { useRouter } from "next/router"


const allColumns: ColumnConfig[] = [
  { key: "title", label: "Title", category: "basic", defaultVisible: true },
  {
    key: "artists",
    label: "Artists",
    category: "basic",
    defaultVisible: true,
    render: (artists: string[]) => artists.join(", "),
  },
  { key: "albumArtist", label: "Album Artist", category: "basic", defaultVisible: false },
  {
    key: "albums",
    label: "Albums",
    category: "basic",
    defaultVisible: true,
    render: (albums: string[]) => albums.join(", "),
  },
  {
    key: "years",
    label: "Years",
    category: "basic",
    defaultVisible: true,
    render: (years: number[]) => years.join(", "),
  },
  {
    key: "genres",
    label: "Genres",
    category: "basic",
    defaultVisible: true,
    render: (genres: string[]) => (
      <div className="flex flex-wrap gap-1">
        {genres.map((genre, index) => (
          <Badge key={index} variant="outline">
            {genre}
          </Badge>
        ))}
      </div>
    ),
  },
  { key: "trackNumber", label: "Track #", category: "basic", defaultVisible: false },
  { key: "discNumber", label: "Disc #", category: "basic", defaultVisible: false },

  { key: "duration", label: "Duration", category: "technical", defaultVisible: true },
  { key: "bitrate", label: "Bitrate", category: "technical", defaultVisible: false },
  { key: "sampleRate", label: "Sample Rate", category: "technical", defaultVisible: false },
  { key: "channels", label: "Channels", category: "technical", defaultVisible: false },
  { key: "encoder", label: "Encoder", category: "technical", defaultVisible: false },
  { key: "fileSize", label: "File Size", category: "technical", defaultVisible: false },

  {
    key: "composers",
    label: "Composers",
    category: "additional",
    defaultVisible: false,
    render: (composers: string[]) => composers.join(", "),
  },
  {
    key: "conductors",
    label: "Conductors",
    category: "additional",
    defaultVisible: false,
    render: (conductors: string[]) => conductors.join(", "),
  },
  { key: "publisher", label: "Publisher", category: "additional", defaultVisible: false },
  { key: "copyright", label: "Copyright", category: "additional", defaultVisible: false },
  { key: "isrc", label: "ISRC", category: "additional", defaultVisible: false },
  { key: "bpm", label: "BPM", category: "additional", defaultVisible: false },
  { key: "key", label: "Key", category: "additional", defaultVisible: false },
  { key: "mood", label: "Mood", category: "additional", defaultVisible: false },
  { key: "language", label: "Language", category: "additional", defaultVisible: false },

  { key: "comments", label: "Comments", category: "custom", defaultVisible: false },
  { key: "lyrics", label: "Lyrics", category: "custom", defaultVisible: false },

  { key: "paths", label: "File Path", category: "file", defaultVisible: false, render: (paths: string[]) => paths[0] },
  { key: "lastModified", label: "Modified", category: "file", defaultVisible: false },
  { key: "playCount", label: "Play Count", category: "file", defaultVisible: false },
  {
    key: "rating",
    label: "Rating",
    category: "file",
    defaultVisible: false,
    render: (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating),
  },
]

const getAllUniqueValues = (data: SongMetadata[], key: keyof SongMetadata) => {
  const allValues = data.flatMap((item) => item[key])
  return [...new Set(allValues)]
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [selectedArtist, setSelectedArtist] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [sortField, setSortField] = useState<keyof SongMetadata>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof SongMetadata>>(
    new Set(allColumns.filter((col) => col.defaultVisible).map((col) => col.key)),
  )
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false)
  const router = useRouter()
  const itemsPerPage = 20

  // Get unique values for filters from arrays
  const genres = getAllUniqueValues(mockSongs, "genres") as string[]
  const artists = getAllUniqueValues(mockSongs, "artists") as string[]
  const years = getAllUniqueValues(mockSongs, "years") as number[]

  // Prepare options for comboboxes
  const genreOptions = [{ value: "", label: "All Genres" }, ...genres.map((genre) => ({ value: genre, label: genre }))]
  const artistOptions = [
    { value: "", label: "All Artists" },
    ...artists.map((artist) => ({ value: artist, label: artist })),
  ]
  const yearOptions = [
    { value: "", label: "All Years" },
    ...years.sort((a, b) => b - a).map((year) => ({ value: year.toString(), label: year.toString() })),
  ]

  // Toggle column visibility
  const toggleColumn = (key: keyof SongMetadata) => {
    const newVisibleColumns = new Set(visibleColumns)
    if (newVisibleColumns.has(key)) {
      newVisibleColumns.delete(key)
    } else {
      newVisibleColumns.add(key)
    }
    setVisibleColumns(newVisibleColumns)
  }

  // Toggle all columns in a category
  const toggleCategory = (category: string, checked: boolean) => {
    const columnsInCategory = allColumns.filter((col) => col.category === category).map((col) => col.key)
    const newVisibleColumns = new Set(visibleColumns)

    if (checked) {
      columnsInCategory.forEach((key) => newVisibleColumns.add(key))
    } else {
      columnsInCategory.forEach((key) => newVisibleColumns.delete(key))
    }

    setVisibleColumns(newVisibleColumns)
  }

  // Check if all columns in a category are visible
  const isCategoryChecked = (category: string) => {
    const columnsInCategory = allColumns.filter((col) => col.category === category).map((col) => col.key)
    return columnsInCategory.every((key) => visibleColumns.has(key))
  }

  // Reset to default columns
  const resetToDefaultColumns = () => {
    setVisibleColumns(new Set(allColumns.filter((col) => col.defaultVisible).map((col) => col.key)))
  }

  // Filter songs based on search and filters
  const filteredSongs = mockSongs
    .filter((song) => {
      const matchesSearch =
        searchQuery === "" ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artists.some((artist) => artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
        song.albums.some((album) => album.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesGenre = selectedGenre === "" || song.genres.includes(selectedGenre)
      const matchesArtist = selectedArtist === "" || song.artists.includes(selectedArtist)
      const matchesYear = selectedYear === "" || song.years.some((year) => year.toString() === selectedYear)

      return matchesSearch && matchesGenre && matchesArtist && matchesYear
    })
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      // Handle different types of fields
      if (Array.isArray(fieldA) && Array.isArray(fieldB)) {
        // For array fields, sort by first element
        const valueA = fieldA.length > 0 ? fieldA[0] : ""
        const valueB = fieldB.length > 0 ? fieldB[0] : ""

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        } else {
          return sortDirection === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA)
        }
      } else if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      } else {
        // For numeric and other fields
        return sortDirection === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA)
      }
    })

  // Calculate pagination
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredSongs.length)
  const currentSongs = filteredSongs.slice(startIndex, endIndex)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/auth/login');
    }
  }, [router]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedGenre, selectedArtist, selectedYear])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setSelectedArtist("")
    setSelectedYear("")
    setCurrentPage(1)
  }

  // Pagination navigation
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleSort = (field: keyof SongMetadata) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get visible columns in order
  const getVisibleColumnsInOrder = () => {
    return allColumns.filter((col) => visibleColumns.has(col.key))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold">Music Library</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search songs, artists, albums..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Column Selector Dialog */}
              <Dialog open={isColumnDialogOpen} onOpenChange={setIsColumnDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" title="Select columns">
                    <Columns className="h-4 w-4" />
                    <span className="sr-only">Select columns</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select Columns to Display</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh] mt-4">
                    <div className="space-y-6 pr-4">
                      {/* Basic Metadata Category */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id="basic-category"
                            checked={isCategoryChecked("basic")}
                            onCheckedChange={(checked) => toggleCategory("basic", !!checked)}
                          />
                          <label htmlFor="basic-category" className="text-sm font-medium">
                            Basic Metadata
                          </label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {allColumns
                            .filter((col) => col.category === "basic")
                            .map((column) => (
                              <div key={column.key.toString()} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`col-${column.key}`}
                                  checked={visibleColumns.has(column.key)}
                                  onCheckedChange={() => toggleColumn(column.key)}
                                />
                                <label htmlFor={`col-${column.key}`} className="text-sm">
                                  {column.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Technical Metadata Category */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id="technical-category"
                            checked={isCategoryChecked("technical")}
                            onCheckedChange={(checked) => toggleCategory("technical", !!checked)}
                          />
                          <label htmlFor="technical-category" className="text-sm font-medium">
                            Technical Metadata
                          </label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {allColumns
                            .filter((col) => col.category === "technical")
                            .map((column) => (
                              <div key={column.key.toString()} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`col-${column.key}`}
                                  checked={visibleColumns.has(column.key)}
                                  onCheckedChange={() => toggleColumn(column.key)}
                                />
                                <label htmlFor={`col-${column.key}`} className="text-sm">
                                  {column.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Additional Metadata Category */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id="additional-category"
                            checked={isCategoryChecked("additional")}
                            onCheckedChange={(checked) => toggleCategory("additional", !!checked)}
                          />
                          <label htmlFor="additional-category" className="text-sm font-medium">
                            Additional Metadata
                          </label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {allColumns
                            .filter((col) => col.category === "additional")
                            .map((column) => (
                              <div key={column.key.toString()} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`col-${column.key}`}
                                  checked={visibleColumns.has(column.key)}
                                  onCheckedChange={() => toggleColumn(column.key)}
                                />
                                <label htmlFor={`col-${column.key}`} className="text-sm">
                                  {column.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Custom Tags Category */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id="custom-category"
                            checked={isCategoryChecked("custom")}
                            onCheckedChange={(checked) => toggleCategory("custom", !!checked)}
                          />
                          <label htmlFor="custom-category" className="text-sm font-medium">
                            Custom Tags
                          </label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {allColumns
                            .filter((col) => col.category === "custom")
                            .map((column) => (
                              <div key={column.key.toString()} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`col-${column.key}`}
                                  checked={visibleColumns.has(column.key)}
                                  onCheckedChange={() => toggleColumn(column.key)}
                                />
                                <label htmlFor={`col-${column.key}`} className="text-sm">
                                  {column.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* File Information Category */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id="file-category"
                            checked={isCategoryChecked("file")}
                            onCheckedChange={(checked) => toggleCategory("file", !!checked)}
                          />
                          <label htmlFor="file-category" className="text-sm font-medium">
                            File Information
                          </label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {allColumns
                            .filter((col) => col.category === "file")
                            .map((column) => (
                              <div key={column.key.toString()} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`col-${column.key}`}
                                  checked={visibleColumns.has(column.key)}
                                  onCheckedChange={() => toggleColumn(column.key)}
                                />
                                <label htmlFor={`col-${column.key}`} className="text-sm">
                                  {column.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={resetToDefaultColumns}>
                      Reset to Default
                    </Button>
                    <Button onClick={() => setIsColumnDialogOpen(false)}>Apply</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={resetFilters}>Reset all filters</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Genre:</span>
              <Combobox
                options={genreOptions}
                value={selectedGenre}
                onChange={setSelectedGenre}
                placeholder="All Genres"
                width="w-[150px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Artist:</span>
              <Combobox
                options={artistOptions}
                value={selectedArtist}
                onChange={setSelectedArtist}
                placeholder="All Artists"
                width="w-[180px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Year:</span>
              <Combobox
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
                placeholder="All Years"
                width="w-[120px]"
              />
            </div>

            {(selectedGenre || selectedArtist || selectedYear || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9">
                Clear Filters
              </Button>
            )}
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  {getVisibleColumnsInOrder().map((column) => (
                    <TableHead
                      key={column.key.toString()}
                      className="cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort(column.key)}
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        {sortField === column.key &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="h-3 w-3" />
                          ) : (
                            <SortDesc className="h-3 w-3" />
                          ))}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSongs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={getVisibleColumnsInOrder().length + 1} className="h-24 text-center">
                      No songs found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentSongs.map((song) => (
                    <TableRow key={song.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="w-[40px]">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                      </TableCell>
                      {getVisibleColumnsInOrder().map((column) => (
                        <TableCell key={column.key.toString()} className="whitespace-nowrap">
                          {column.render
                            ? column.render(song[column.key] as never)
                            : song[column.key] !== undefined
                              ? String(song[column.key])
                              : "—"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{endIndex} of {filteredSongs.length} songs
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Previous
                </Button>

                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageToShow: number
                    if (totalPages <= 5) {
                      pageToShow = i + 1
                    } else if (currentPage <= 3) {
                      pageToShow = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + i
                    } else {
                      pageToShow = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageToShow}
                        variant={currentPage === pageToShow ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => goToPage(pageToShow)}
                      >
                        {pageToShow}
                      </Button>
                    )
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="mx-1">...</span>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0" onClick={() => goToPage(totalPages)}>
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
