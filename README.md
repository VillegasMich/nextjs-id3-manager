# nextjs-id3-manager

A comprehensive web application for managing your music library, with advanced filtering, metadata display, and file management capabilities.

## Overview

Music Manager is a modern web application designed to help music enthusiasts organize, browse, and manage their music collections. With a focus on detailed metadata display and powerful filtering options, it provides a seamless experience for managing your music library.

## Features

### Navigation

- Responsive navbar with mobile support
- Easy access to all application sections

### Music Library

- Comprehensive ID3 tag display with customizable columns
- Advanced filtering by genre, artist, year, and text search
- Sortable columns for easy organization
- Pagination for large libraries
- Responsive design that works on all screen sizes

### Metadata Display

- View all ID3 tags from your MP3 files
- Customizable column selector to show only the fields you care about
- Categories of metadata:

- Basic (title, artist, album, etc.)
- Technical (bitrate, sample rate, file size, etc.)
- Additional (composer, publisher, BPM, etc.)
- Custom tags (comments, lyrics)
- File information (path, modified date, play count)

### File Management

- Upload MP3 files to your library
- Drag and drop support for easy file addition

## Technologies Used

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/music-manager.git
cd music-manager
```

2. Install dependencies:

```shellscript
npm install
```

3. Run the development server:

```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Browsing Your Library

1. Navigate to the Library page using the navbar
2. Use the search bar to find specific songs, artists, or albums
3. Filter by genre, artist, or year using the dropdown selectors
4. Sort by any column by clicking the column header
5. Customize visible columns by clicking the columns icon

### Customizing Table Columns

1. Click the columns icon in the top right of the library page
2. Check/uncheck columns you want to show/hide
3. Use category checkboxes to toggle entire groups of columns
4. Click "Reset to Default" to return to the default column configuration
5. Click "Apply" to save your changes

### Uploading Music

1. Navigate to the Upload page
2. Drag and drop MP3 files or click to select files
3. View file information in the console (for development purposes)

## Project Structure

```plaintext
music-manager/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── library/            # Library page
│   └── upload/             # Upload page
├── components/             # React components
│   ├── navbar.tsx          # Navigation bar
│   ├── footer.tsx          # Footer component
│   ├── file-upload.tsx     # File upload component
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions
│   └── utils.ts            # Helper functions
└── public/                 # Static assets
```

## Planned Features

- Music player with playback controls
- Playlist creation and management
- Album view with cover art display
- Artist detail pages
- Automatic metadata extraction from uploaded files
- Cloud storage integration
- User accounts and preferences
- Mobile app support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
