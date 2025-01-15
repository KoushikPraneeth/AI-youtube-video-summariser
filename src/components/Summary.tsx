import { Card } from "@/components/ui/card";

interface SummaryProps {
  summary: string;
  isLoading: boolean;
}

export const Summary = ({ summary, isLoading }: SummaryProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 glass-morphism animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </Card>
    );
  }

  if (!summary) return null;

  return (
    <Card className="p-6 glass-morphism animate-fade-up">
      <h3 className="text-lg font-semibold mb-4">Summary</h3>
      <p className="text-sm leading-relaxed">{summary}</p>
    </Card>
  );
};