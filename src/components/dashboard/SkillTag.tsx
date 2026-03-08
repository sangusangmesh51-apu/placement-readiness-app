import { Check, AlertCircle } from 'lucide-react';
import type { SkillConfidence } from '../../types/analysis';

interface SkillTagProps {
  skill: string;
  confidence: SkillConfidence;
  onToggle: (skill: string, newConfidence: SkillConfidence) => void;
}

export function SkillTag({ skill, confidence, onToggle }: SkillTagProps) {
  const isKnow = confidence === 'know';

  return (
    <button
      onClick={() => onToggle(skill, isKnow ? 'practice' : 'know')}
      className={`
        group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200 border
        ${isKnow 
          ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200' 
          : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
        }
      `}
      title={isKnow ? 'Click to mark as needs practice' : 'Click to mark as known'}
    >
      {isKnow ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5" />
      )}
      <span>{skill}</span>
      <span className="text-xs opacity-70">
        {isKnow ? 'I know this' : 'Need practice'}
      </span>
    </button>
  );
}
