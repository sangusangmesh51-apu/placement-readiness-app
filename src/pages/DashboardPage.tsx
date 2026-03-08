import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
  CircularProgress,
  SkillBreakdown,
  ContinuePractice,
  WeeklyGoals,
  UpcomingAssessments,
} from '../components/dashboard';

export function DashboardPage() {
  // Weekly goals data
  const weeklyDays = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: false },
    { day: 'Fri', active: true },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];

  // Upcoming assessments data
  const assessments = [
    { id: 1, title: 'DSA Mock Test', date: 'Tomorrow, Mar 9', time: '10:00 AM' },
    { id: 2, title: 'System Design Review', date: 'Wednesday, Mar 11', time: '2:00 PM' },
    { id: 3, title: 'HR Interview Prep', date: 'Friday, Mar 13', time: '11:00 AM' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your placement readiness</p>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness - Circular Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CircularProgress value={72} max={100} size={180} strokeWidth={14} />
            <p className="text-gray-500 mt-4 font-medium">Readiness Score</p>
          </CardContent>
        </Card>

        {/* Skill Breakdown - Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillBreakdown />
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <ContinuePractice topic="Dynamic Programming" completed={3} total={10} />

        {/* Weekly Goals */}
        <WeeklyGoals solved={12} target={20} days={weeklyDays} />

        {/* Upcoming Assessments - Full width on mobile, spans both columns on large screens */}
        <div className="lg:col-span-2">
          <UpcomingAssessments assessments={assessments} />
        </div>
      </div>
    </div>
  );
}
