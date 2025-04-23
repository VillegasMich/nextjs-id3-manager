
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Music Manager</h1>
        <p className="text-muted-foreground mb-4">
          Manage your music library, create playlists, and discover new music all in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Recently Played</h2>
            <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
              Your recent tracks will appear here
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Your Playlists</h2>
            <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
              Your playlists will appear here
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Recommended</h2>
            <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
              Recommendations will appear here
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div >
  )
}

