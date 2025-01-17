import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          LinkedIn Post Generator
        </Link>
        <Link href="/post-generator">
          <Button variant="secondary">Create Post</Button>
        </Link>
      </div>
    </nav>
  )
}

