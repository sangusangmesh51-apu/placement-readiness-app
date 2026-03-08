import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { RoundMapping } from '../../types/analysis';

interface RoundMappingTimelineProps {
  rounds: RoundMapping[];
}

export function RoundMappingTimeline({ rounds }: RoundMappingTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-primary-600" />
          Interview Round Mapping
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />

          {/* Rounds */}
          <div className="space-y-6">
            {rounds.map((round, index) => (
              <div key={round.round} className="relative flex gap-4">
                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                    {round.round}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{round.title}</h4>
                      {index === rounds.length - 1 && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          Final
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {round.description}
                    </p>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <p className="text-xs text-amber-800">
                        <span className="font-medium">Why this matters: </span>
                        {round.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
