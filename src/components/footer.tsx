import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand and description */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MusicManager</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your all-in-one platform for managing and discovering music.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Explore</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Discover
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Charts
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              New Releases
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Genres
            </Link>
          </div>

          {/* Account links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Account</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Profile
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Settings
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Subscription
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Download App
            </Link>
          </div>

          {/* Help links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Help</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Support Center
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Community
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              FAQs
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-sm font-medium">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates and new releases.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[220px]" />
              <Button variant="outline" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MusicManager. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
