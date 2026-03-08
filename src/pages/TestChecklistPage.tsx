import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  RotateCcw, 
  ChevronRight,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  getTestChecklist, 
  toggleTestItem, 
  resetTestChecklist,
  getPassedCount,
  getTotalCount,
  type TestItem 
} from '../lib/testChecklist';

export function TestChecklistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<TestItem[]>([]);
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadChecklist = useCallback(() => {
    const checklist = getTestChecklist();
    setItems(checklist.items);
    setLastUpdated(checklist.lastUpdated);
  }, []);

  useEffect(() => {
    loadChecklist();
  }, [loadChecklist]);

  const handleToggle = (itemId: string) => {
    toggleTestItem(itemId);
    loadChecklist();
  };

  const handleReset = () => {
    if (window.confirm('Reset all test checklist items? This cannot be undone.')) {
      resetTestChecklist();
      loadChecklist();
    }
  };

  const toggleHint = (itemId: string) => {
    setExpandedHints(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const passedCount = getPassedCount();
  const totalCount = getTotalCount();
  const allPassed = passedCount === totalCount;
  const progressPercent = (passedCount / totalCount) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Checklist</h1>
        <p className="text-gray-600">
          Verify all functionality before shipping. Check each item after testing.
        </p>
      </div>

      {/* Summary Card */}
      <Card className={`mb-6 ${allPassed ? 'border-green-200' : 'border-amber-200'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                allPassed ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                {allPassed ? (
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tests Passed: {passedCount} / {totalCount}
                </h2>
                <p className={`text-sm mt-1 ${allPassed ? 'text-green-600' : 'text-amber-600'}`}>
                  {allPassed 
                    ? 'All tests passed! Ready to ship.' 
                    : 'Fix issues before shipping.'}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {Math.round(progressPercent)}%
              </div>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  allPassed ? 'bg-green-500' : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset checklist
            </button>
            
            {allPassed && (
              <button
                onClick={() => navigate('/prp/08-ship')}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Proceed to Ship
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {lastUpdated && (
            <p className="mt-4 text-xs text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Test Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
            Test Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <div 
                key={item.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  item.checked ? 'bg-green-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="mt-0.5 flex-shrink-0"
                  >
                    {item.checked ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-sm text-gray-400 mr-2">{index + 1}.</span>
                        <span className={`font-medium ${
                          item.checked ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Hint Toggle */}
                      <button
                        onClick={() => toggleHint(item.id)}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary-600 transition-colors flex-shrink-0"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          {expandedHints.has(item.id) ? 'Hide hint' : 'How to test'}
                        </span>
                      </button>
                    </div>

                    {/* Hint */}
                    {expandedHints.has(item.id) && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">How to test: </span>
                          {item.hint}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Quick Test Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/analyzer')}
              className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              /analyzer
            </button>
            <button
              onClick={() => navigate('/history')}
              className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              /history
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              /dashboard
            </button>
            <button
              onClick={() => navigate('/results')}
              className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              /results
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
