import { BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface ContinuePracticeProps {
  topic: string;
  completed: number;
  total: number;
}

export function ContinuePractice({ topic, completed, total }: ContinuePracticeProps) {
  const progress = (completed / total) * 100;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-1">Continue where you left off</p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{topic}</h4>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{completed}/{total}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
