"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCopy } from 'lucide-react'

export default function LinkedInPostGenerator() {
  const [postType, setPostType] = useState('')
  const [topic, setTopic] = useState('')
  const [keyPoints, setKeyPoints] = useState('')
  const [generatedPost, setGeneratedPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generatePost = async () => {
    if (!postType || !topic || !keyPoints) {
      setError('Please fill in all fields.');
      return;
    }
  
    setError('');
    setLoading(true);
  
    // Build the prompt
    let post = `🚀 ${postType.toUpperCase()} ALERT: ${topic}\n\n`;
    const points = keyPoints.split('\n').filter(point => point.trim() !== '');
    points.forEach((point, index) => {
      post += `${index + 1}. ${point.trim()}\n`;
    });
    post += `\n💡 What are your thoughts on this? Let's discuss in the comments!\n\n`;
    post += `#${topic.replace(/\s+/g, '')} #ProfessionalDevelopment #LinkedIn`;
  
    try {
      const response = await fetch(`/api/generate-ai-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${post.trim().replace(/\s+/g, ' ')} "[Heading with relevant emoji][Post content (concise and impactful)]
[Optional: Call to action, e.g., "Share your thoughts in the comments!", "Learn more in the link below", "Connect with me to discuss further"]
[Optional: Relevant hashtags]"`,
        }),
      });
  
      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser.');
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
  
      // Process the stream as chunks arrive
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
  
        // Optionally update the state incrementally to show progress
        setGeneratedPost(prev => prev + chunk);
      }
  
      // Set the final complete text
      setGeneratedPost(result);
    } catch (error) {
      console.error('Error generating AI content:', error);
      setError('Failed to generate AI content. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy to clipboard.'));
  }

  return (
    <div className="container mx-auto p-16">
      <h1 className="text-2xl font-bold mb-4">LinkedIn Post Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Enter the details for your LinkedIn post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="postType">Post Type</Label>
              <Select onValueChange={setPostType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tip">Tip</SelectItem>
                  <SelectItem value="insight">Insight</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="Enter the main topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyPoints">Key Points</Label>
              <Textarea
                id="keyPoints"
                placeholder="Enter key points (one per line)"
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                rows={5}
              />
            </div>
            <Button onClick={generatePost} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Post'}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Post</CardTitle>
            <CardDescription>Your LinkedIn post is ready!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={generatedPost}
              readOnly
              rows={18}
              className="font-mono text-sm"
            />
            <Button onClick={copyToClipboard} className="w-full">
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}