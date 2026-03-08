import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Unlock, 
  Rocket, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  isAllTestsPassed, 
  getPassedCount, 
  getTotalCount,
  getTestChecklist 
} from '../lib/testChecklist';

export function ShipPage() {
  const navigate = useNavigate();
  const [canShip, setCanShip] = useState(false);
  const [passedCount, setPassedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(10);
  const [uncheckedItems, setUncheckedItems] = useState<string[]>([]);

  useEffect(() => {
    const passed = getPassedCount();
    const total = getTotalCount();
    const allPassed = isAllTestsPassed();
    
    setPassedCount(passed);
    setTotalCount(total);
    setCanShip(allPassed);

    // Get list of unchecked items
    if (!allPassed) {
      const checklist = getTestChecklist();
      const unchecked = checklist.items
        .filter(item => !item.checked)
        .map(item => item.label);
      setUncheckedItems(unchecked);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ship</h1>
        <p className="text-gray-600">
          Ready to deploy? Complete all tests first.
        </p>
      </div>

      {/* Lock Status Card */}
      <Card className={`mb-6 ${canShip ? 'border-green-200' : 'border-red-200'}`}>
        <CardContent className="p-8">
          <div className="text-center">
            {/* Lock Icon */}
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              canShip ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {canShip ? (
                <Unlock className="w-12 h-12 text-green-600" />
              ) : (
                <Lock className="w-12 h-12 text-red-600" />
              )}
            </div>

            {/* Status */}
            <h2 className={`text-2xl font-bold mb-2 ${
              canShip ? 'text-green-700' : 'text-red-700'
            }`}>
              {canShip ? 'Ready to Ship' : 'Shipping Locked'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {canShip 
                ? 'All tests passed. You can proceed with deployment.'
                : `Complete all ${totalCount} tests to unlock shipping.`}
            </p>

            {/* Progress */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">
                  {passedCount} / {totalCount} tests passed
                </span>
                <span className={`font-medium ${
                  canShip ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {Math.round((passedCount / totalCount) * 100)}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    canShip ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${(passedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!canShip && (
                <button
                  onClick={() => navigate('/prp/07-test')}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go to Test Checklist
                </button>
              )}

              {canShip && (
                <>
                  <button
                    onClick={() => alert('Ship functionality would trigger deployment here.')}
                    className="flex items-center gap-2 px-8 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <Rocket className="w-5 h-5" />
                    Ship Now
                  </button>
                  
                  <button
                    onClick={() => navigate('/prp/07-test')}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Review Tests
                  </button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Items (if locked) */}
      {!canShip && uncheckedItems.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              Pending Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {uncheckedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-amber-600 font-medium">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Ship Checklist (if unlocked) */}
      {canShip && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Pre-Ship Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">All 10 tests passed</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Input validation working</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Score calculation stable</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">History persistence verified</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Export functionality tested</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-green-100">
              <p className="text-sm text-green-700 mb-4">
                Platform is ready for deployment. All core functionality has been verified.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Dashboard
                </button>
                <button
                  onClick={() => navigate('/analyzer')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Analyzer
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
