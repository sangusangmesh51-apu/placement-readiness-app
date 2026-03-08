import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  Building2, 
  Briefcase, 
  Calendar, 
  Award, 
  Trash2, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { getHistory, deleteAnalysis, clearHistory, hasCorruptedEntries } from '../lib/storage';
import type { HistoryEntry } from '../types/analysis';

export function HistoryPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showCorruptionWarning, setShowCorruptionWarning] = useState(false);

  useEffect(() => {
    setEntries(getHistory());
    setShowCorruptionWarning(hasCorruptedEntries());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAnalysis(id);
    setEntries(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setEntries([]);
    setShowClearConfirm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
          <p className="text-gray-600 mt-1">
            {entries.length} {entries.length === 1 ? 'analysis' : 'analyses'} saved
          </p>
        </div>
        {entries.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No History Yet</h2>
            <p className="text-gray-600 mb-6">Analyze job descriptions to build your history</p>
            <button
              onClick={() => navigate('/analyzer')}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              Analyze a JD
            </button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/results?id=${entry.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Score Badge */}
                    <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${getScoreColor(entry.readinessScore)}`}>
                      <span className="text-2xl font-bold">{entry.readinessScore}</span>
                      <span className="text-xs">/100</span>
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {entry.company || 'Unknown Company'}
                      </h3>
                      {entry.role && (
                        <p className="flex items-center gap-1 text-gray-600 mt-1">
                          <Briefcase className="w-4 h-4" />
                          {entry.role}
                        </p>
                      )}
                      <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(entry.id, e)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Corruption Warning */}
      {showCorruptionWarning && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 text-sm">
                One saved entry couldn't be loaded. Create a new analysis.
              </p>
              <button
                onClick={() => setShowCorruptionWarning(false)}
                className="ml-auto text-amber-600 hover:text-amber-700"
              >
                Dismiss
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Clear All History?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                This will permanently delete all {entries.length} saved analyses. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Clear All
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
