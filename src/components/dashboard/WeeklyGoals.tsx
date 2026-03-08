import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface DayActivity {
  day: string;
  active: boolean;
}

interface WeeklyGoalsProps {
  solved: number;
  target: number;
  days: DayActivity[];
}

export function WeeklyGoals({ solved, target, days }: WeeklyGoalsProps) {
  const progress = (solved / target) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          Weekly Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Problems Solved</span>
            <span className="font-semibold text-gray-900">
              {solved}/{target} this week
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Day circles */}
        <div className="flex justify-between items-center">
          {days.map(({ day, active }) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day.charAt(0)}
              </div>
              <span className="text-xs text-gray-500">{day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
