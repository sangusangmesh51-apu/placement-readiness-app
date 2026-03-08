interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ 
  value, 
  max, 
  size = 200, 
  strokeWidth = 16 
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine color based on score
  const getColor = () => {
    if (progress >= 80) return '#22c55e'; // green-500
    if (progress >= 60) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500 mt-1">/ {max}</span>
      </div>
    </div>
  );
}
