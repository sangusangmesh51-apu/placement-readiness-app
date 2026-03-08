import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface Assessment {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface UpcomingAssessmentsProps {
  assessments: Assessment[];
}

export function UpcomingAssessments({ assessments }: UpcomingAssessmentsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Assessments</CardTitle>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              {/* Date box */}
              <div className="w-14 h-14 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-500 uppercase">
                  {assessment.date.split(',')[0].slice(0, 3)}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {assessment.date.match(/\d+/)?.[0] || ''}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {assessment.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {assessment.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {assessment.time}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
