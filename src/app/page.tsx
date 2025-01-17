import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Lightbulb, Zap, MessageSquare, Megaphone } from 'lucide-react'
import Navigation from '@/components/ui/navbar'

export default function Home() {
  return (
    <div>
    <Navigation/>
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">LinkedIn Post Generator</h1>
        <p className="text-xl text-muted-foreground">Create engaging LinkedIn posts in seconds</p>
      </header>

      <main>
        <section className="mb-12">
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Boost Your LinkedIn Presence</CardTitle>
              <CardDescription>Generate professional and engaging posts with ease</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/post-generator">
                <Button size="lg">
                  Start Generating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lightbulb, title: "Tips", description: "Share valuable insights and advice" },
              { icon: Zap, title: "Insights", description: "Highlight industry trends and observations" },
              { icon: MessageSquare, title: "Questions", description: "Engage your network with thought-provoking queries" },
              { icon: Megaphone, title: "Announcements", description: "Spread the word about important updates" }
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Why Use Our LinkedIn Post Generator?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Save time and effort in crafting engaging posts</li>
                <li>Maintain a consistent posting schedule</li>
                <li>Improve your LinkedIn engagement</li>
                <li>Showcase your expertise and knowledge</li>
                <li>Easily adapt templates to your unique voice</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
    </div>
  )
}

