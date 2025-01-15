import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TranscriptProps {
  content: string
}

export function Transcript({ content }: TranscriptProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap text-sm">
          {content}
        </div>
      </CardContent>
    </Card>
  )
}
