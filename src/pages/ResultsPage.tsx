import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar, 
  HelpCircle, 
  Award, 
  Code2, 
  Database, 
  Cloud, 
  Globe, 
  Cpu, 
  Languages,
  Bug,
  ArrowLeft,
  Bookmark,
  Share2,
  Copy,
  Download,
  Lightbulb,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  CircularProgress, 
  SkillTag, 
  CompanyIntelCard, 
  RoundMappingTimeline 
} from '../components/dashboard';
import { getLatestAnalysis, getAnalysisById, updateAnalysis } from '../lib/storage';
import type { AnalysisResult, ExtractedSkills, SkillConfidence } from '../types/analysis';

const categoryIcons: Record<keyof ExtractedSkills, typeof Code2> = {
  coreCS: Cpu,
  languages: Languages,
  web: Globe,
  data: Database,
  cloudDevOps: Cloud,
  testing: Bug,
};

const categoryLabels: Record<keyof ExtractedSkills, string> = {
  coreCS: 'Core CS',
  languages: 'Languages',
  web: 'Web',
  data: 'Data',
  cloudDevOps: 'Cloud & DevOps',
  testing: 'Testing',
};

export function ResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    let result: AnalysisResult | null;

    if (id) {
      result = getAnalysisById(id);
    } else {
      result = getLatestAnalysis();
    }

    setAnalysis(result);
    setLoading(false);
  }, [searchParams]);

  // Get base score and final score
  const baseScore = analysis?.baseScore ?? analysis?.readinessScore ?? 0;
  const finalScore = analysis?.finalScore ?? baseScore;
  
  // Calculate live score based on skill confidence (for real-time updates)
  const liveScore = useMemo(() => {
    if (!analysis) return 0;
    
    let score = baseScore;
    const confidenceMap = analysis.skillConfidenceMap || {};
    
    Object.values(confidenceMap).forEach((confidence) => {
      if (confidence === 'know') {
        score += 2;
      } else {
        score -= 2;
      }
    });
    
    return Math.max(0, Math.min(100, score));
  }, [analysis, baseScore]);

  // Handle skill confidence toggle
  const handleSkillToggle = useCallback((skill: string, newConfidence: SkillConfidence) => {
    if (!analysis) return;
    
    const updatedAnalysis: AnalysisResult = {
      ...analysis,
      skillConfidenceMap: {
        ...analysis.skillConfidenceMap,
        [skill]: newConfidence,
      },
    };
    
    setAnalysis(updatedAnalysis);
    updateAnalysis(updatedAnalysis);
  }, [analysis]);

  // Get weak skills (practice-marked)
  const weakSkills = useMemo(() => {
    if (!analysis?.skillConfidenceMap) return [];
    return Object.entries(analysis.skillConfidenceMap)
      .filter(([, confidence]) => confidence === 'practice')
      .map(([skill]) => skill)
      .slice(0, 3);
  }, [analysis]);

  // Copy to clipboard
  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Export functions
  const exportPlan = () => {
    if (!analysis) return;
    const text = analysis.plan.map(day => 
      `Day ${day.day}: ${day.title}\n${day.tasks.map(t => `  - ${t}`).join('\n')}`
    ).join('\n\n');
    copyToClipboard(text, 'plan');
  };

  const exportChecklist = () => {
    if (!analysis) return;
    const text = analysis.checklist.map((round, idx) => 
      `Round ${idx + 1}: ${round.roundTitle}\n${round.items.map(i => `  - ${i}`).join('\n')}`
    ).join('\n\n');
    copyToClipboard(text, 'checklist');
  };

  const exportQuestions = () => {
    if (!analysis) return;
    const text = analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    copyToClipboard(text, 'questions');
  };

  const downloadAsTxt = () => {
    if (!analysis) return;
    
    const content = `PLACEMENT READINESS ANALYSIS
==============================

Company: ${analysis.company || 'N/A'}
Role: ${analysis.role || 'N/A'}
Date: ${new Date(analysis.createdAt).toLocaleDateString()}
Readiness Score: ${liveScore}/100

SKILLS EXTRACTED
----------------
${Object.entries(analysis.extractedSkills)
  .filter(([, skills]) => skills.length > 0)
  .map(([cat, skills]) => `${cat}: ${skills.join(', ')}`)
  .join('\n')}

7-DAY PREPARATION PLAN
----------------------
${analysis.plan.map(day => 
  `Day ${day.day}: ${day.title}\n${day.tasks.map(t => `  - ${t}`).join('\n')}`
).join('\n\n')}

ROUND-WISE CHECKLIST
--------------------
${analysis.checklist.map(round => 
  `Round ${round.round}: ${round.title}\n${round.items.map(i => `  - ${i}`).join('\n')}`
).join('\n\n')}

INTERVIEW QUESTIONS
-------------------
${analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placement-analysis-${analysis.company || 'unknown'}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Found</h2>
        <p className="text-gray-600 mb-6">Analyze a job description to see results here</p>
        <button
          onClick={() => navigate('/analyzer')}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          Go to Analyzer
        </button>
      </div>
    );
  }

  const hasSkills = Object.values(analysis.extractedSkills).some(arr => arr.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          {analysis.company && (
            <p className="text-gray-600 mt-1">
              {analysis.company} {analysis.role && `• ${analysis.role}`}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/analyzer')}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Share2 className="w-4 h-4" />
          New Analysis
        </button>
      </div>

      {/* Company Intel (if available) */}
      {analysis.companyIntel && (
        <CompanyIntelCard intel={analysis.companyIntel} />
      )}

      {/* Round Mapping Timeline (if available) */}
      {analysis.roundMappingLegacy && (
        <RoundMappingTimeline rounds={analysis.roundMappingLegacy} />
      )}

      {/* Score & Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" />
              Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CircularProgress 
              value={liveScore} 
              max={100} 
              size={160} 
              strokeWidth={12} 
            />
            <p className="text-gray-500 mt-3 text-sm">
              {liveScore >= 80 ? 'Excellent preparation!' :
               liveScore >= 60 ? 'Good progress, keep going!' :
               'Focus on weak areas'}
            </p>
            {liveScore !== baseScore && (
              <p className="text-xs text-gray-400 mt-1">
                Base: {baseScore} • Adjusted: {liveScore > baseScore ? '+' : ''}{liveScore - baseScore}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Extracted Skills */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-600" />
              Key Skills Extracted
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Click to toggle)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasSkills ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(analysis.extractedSkills) as (keyof ExtractedSkills)[]).map((category) => {
                  const skills = analysis.extractedSkills[category];
                  if (skills.length === 0) return null;
                  const Icon = categoryIcons[category];
                  
                  return (
                    <div key={category} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-primary-600" />
                        <span className="font-medium text-gray-700">{categoryLabels[category]}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <SkillTag
                            key={skill}
                            skill={skill}
                            confidence={analysis.skillConfidenceMap?.[skill] || 'practice'}
                            onToggle={handleSkillToggle}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>General fresher stack detected</p>
                <p className="text-sm mt-1">Focus on fundamental CS concepts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preparation Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary-600" />
            Round-wise Preparation Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysis.checklist.map((round, idx) => (
              <div key={idx} className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Round {idx + 1}: {round.roundTitle}
                </h3>
                <ul className="space-y-2">
                  {round.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-gray-600">
                      <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            7-Day Preparation Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {analysis.plan.map((day) => (
              <div key={day.day} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {day.day}
                  </span>
                  <span className="font-medium text-gray-900">{day.title}</span>
                </div>
                <ul className="space-y-1">
                  {day.tasks.map((task, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Questions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-600" />
            Likely Interview Questions
          </CardTitle>
          <button
            onClick={exportQuestions}
            className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
          >
            {copiedSection === 'questions' ? 'Copied!' : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.questions.map((question, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-gray-700">{question}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary-600" />
            Export Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportPlan}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedSection === 'plan' ? 'Copied!' : <><Copy className="w-4 h-4" /> Copy 7-day plan</>}
            </button>
            <button
              onClick={exportChecklist}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedSection === 'checklist' ? 'Copied!' : <><Copy className="w-4 h-4" /> Copy round checklist</>}
            </button>
            <button
              onClick={exportQuestions}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedSection === 'questions' ? 'Copied!' : <><Copy className="w-4 h-4" /> Copy 10 questions</>}
            </button>
            <button
              onClick={downloadAsTxt}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="w-4 h-4" /> Download as TXT
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  Action Next
                </h3>
                <p className="text-gray-600 mb-3">
                  Focus on these top {weakSkills.length} skills marked for practice:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {weakSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <p className="text-gray-700 font-medium mb-1">Suggested next step:</p>
                  <p className="text-gray-600">
                    Start Day 1 plan now. Focus on reviewing the fundamentals of your weakest skill first.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
