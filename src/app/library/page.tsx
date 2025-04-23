"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Filter, Play, Search, SortAsc, SortDesc } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { mockSongs } from "@/util/MockData"
import { SongMetadata } from "@/dto/SongMetadata"


const getUniqueValues = (data: SongMetadata[], key: keyof SongMetadata) => {
  return [...new Set(data.map((item) => item[key]))]
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof SongMetadata>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const genres = getUniqueValues(mockSongs, "genre") as string[]
  const artists = getUniqueValues(mockSongs, "artist") as string[]
  const years = getUniqueValues(mockSongs, "year") as number[]
  const albums = getUniqueValues(mockSongs, "album") as string[]

  const filteredSongs = mockSongs
    .filter((song) => {
      const matchesSearch =
        searchQuery === "" ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesGenre = selectedGenre === null || song.genre === selectedGenre
      const matchesArtist = selectedArtist === null || song.artist === selectedArtist
      const matchesYear = selectedYear === null || song.year === selectedYear
      const matcherAlbum = selectedAlbum === null || song.album === selectedAlbum

      return matchesSearch && matchesGenre && matchesArtist && matchesYear && matcherAlbum
    })
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  // Calculate pagination
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredSongs.length)
  const currentSongs = filteredSongs.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedGenre, selectedArtist, selectedYear])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setSelectedArtist("")
    setSelectedYear(null)
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

  // Toggle sort direction
  const handleSort = (field: keyof SongMetadata) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
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
              <Select value={selectedGenre || ""} onValueChange={(value) => setSelectedGenre(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Artist:</span>
              <Select value={selectedArtist || ""} onValueChange={(value) => setSelectedArtist(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Artists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Artists</SelectItem>
                  {artists.map((artist) => (
                    <SelectItem key={artist} value={artist}>
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Album:</span>
              <Select value={selectedAlbum || ""} onValueChange={(value) => setSelectedAlbum(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Albums" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Albums</SelectItem>
                  {albums.map((album) => (
                    <SelectItem key={album} value={album}>
                      {album}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Year:</span>
              <Select
                value={selectedYear?.toString() || ""}
                onValueChange={(value) => setSelectedYear(value ? Number.parseInt(value) : null)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedGenre || selectedArtist || selectedYear || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9">
                Clear Filters
              </Button>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center gap-1">
                      Title
                      {sortField === "title" &&
                        (sortDirection === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("artist")}>
                    <div className="flex items-center gap-1">
                      Artist
                      {sortField === "artist" &&
                        (sortDirection === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("album")}>
                    <div className="flex items-center gap-1">
                      Album
                      {sortField === "album" &&
                        (sortDirection === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden lg:table-cell" onClick={() => handleSort("genre")}>
                    <div className="flex items-center gap-1">
                      Genre
                      {sortField === "genre" &&
                        (sortDirection === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden sm:table-cell" onClick={() => handleSort("year")}>
                    <div className="flex items-center gap-1">
                      Year
                      {sortField === "year" &&
                        (sortDirection === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSongs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
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
                      <TableCell className="font-medium">{song.title}</TableCell>
                      <TableCell>{song.artist}</TableCell>
                      <TableCell className="hidden md:table-cell">{song.album}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline">{song.genre}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{song.year}</TableCell>
                      <TableCell className="text-right">{song.duration}</TableCell>
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
