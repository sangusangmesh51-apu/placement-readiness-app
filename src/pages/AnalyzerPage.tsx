import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Building2, Briefcase, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { analyzeJD } from '../lib/analysisGenerator';
import { saveAnalysis } from '../lib/storage';

export function AnalyzerPage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jdText.trim()) return;
    if (jdText.trim().length < 200) {
      // Show warning but allow analysis
      console.warn('JD is too short for deep analysis');
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay for UX
    setTimeout(() => {
      const result = analyzeJD(company, role, jdText);
      saveAnalysis(result);
      setIsAnalyzing(false);
      navigate('/results');
    }, 800);
  };

  const isValid = jdText.trim().length >= 50;
  const isShortJD = jdText.trim().length > 0 && jdText.trim().length < 200;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">JD Analyzer</h1>
        <p className="text-gray-600 mt-1">
          Paste a job description to get personalized preparation insights
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            Analyze Job Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-1" />
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Google, Microsoft"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Role / Position
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          {/* JD Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Job Description
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the full job description here... Include requirements, skills needed, and responsibilities for best results."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-y"
            />
            {isShortJD && (
              <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                This JD is too short to analyze deeply. Paste full JD for better output.
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {jdText.length} characters {jdText.length > 800 && '✓ Detailed JD'}
            </p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!isValid || isAnalyzing}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze JD
              </>
            )}
          </button>

          {!isValid && jdText.length > 0 && (
            <p className="text-sm text-amber-600 text-center">
              Please enter at least 50 characters for meaningful analysis
            </p>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-50 p-4 rounded-lg">
          <h4 className="font-medium text-primary-900 mb-1">Better Input = Better Results</h4>
          <p className="text-sm text-primary-700">Include skills, requirements, and responsibilities</p>
        </div>
        <div className="bg-primary-50 p-4 rounded-lg">
          <h4 className="font-medium text-primary-900 mb-1">Add Company & Role</h4>
          <p className="text-sm text-primary-700">Improves your readiness score calculation</p>
        </div>
        <div className="bg-primary-50 p-4 rounded-lg">
          <h4 className="font-medium text-primary-900 mb-1">Everything Saved</h4>
          <p className="text-sm text-primary-700">Analysis history persists across sessions</p>
        </div>
      </div>
    </div>
  );
}
