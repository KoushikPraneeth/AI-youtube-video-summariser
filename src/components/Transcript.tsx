import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TranscriptProps {
  content: string;
  isLoading: boolean;
}

export function Transcript({ content, isLoading }: TranscriptProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
