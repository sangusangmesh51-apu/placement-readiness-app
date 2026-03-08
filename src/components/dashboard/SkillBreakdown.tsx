import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { subject: 'DSA', score: 75, fullMark: 100 },
  { subject: 'System Design', score: 60, fullMark: 100 },
  { subject: 'Communication', score: 80, fullMark: 100 },
  { subject: 'Resume', score: 85, fullMark: 100 },
  { subject: 'Aptitude', score: 70, fullMark: 100 },
];

export function SkillBreakdown() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="#4f46e5"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
