import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand and description */}
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">MusicManager</span>
            </Link>
            <div className="flex space-x-3 mt-1">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick links - first column */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <h3 className="text-xs font-medium mb-1">Explore</h3>
              <div className="space-y-1">
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Discover
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Charts
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  New Releases
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium mb-1">Account</h3>
              <div className="space-y-1">
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Profile
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Settings
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Subscription
                </Link>
              </div>
            </div>
          </div>

          {/* Help links */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <h3 className="text-xs font-medium mb-1">Help</h3>
              <div className="space-y-1">
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Support
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Community
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium mb-1">Legal</h3>
              <div className="space-y-1">
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Privacy
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Terms
                </Link>
                <Link href="#" className="block text-xs text-muted-foreground hover:text-primary">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MusicManager</p>
          <div className="flex space-x-3 mt-2 sm:mt-0">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

