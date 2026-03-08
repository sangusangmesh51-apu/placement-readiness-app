import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Video, 
  BarChart3, 
  Sparkles, 
  Target, 
  Zap,
  CheckCircle2,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'JD Analyzer',
      description: 'Paste any job description and get instant skill extraction, readiness score, and personalized preparation plan.',
    },
    {
      icon: Target,
      title: 'Smart Preparation',
      description: 'Get round-wise checklists, 7-day study plans, and company-specific interview guidance.',
    },
    {
      icon: Zap,
      title: 'Live Score Tracking',
      description: 'Toggle skills you know and watch your readiness score update in real-time.',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Paste Job Description',
      description: 'Copy and paste any job description into our analyzer.',
    },
    {
      step: '2',
      title: 'Get Analysis',
      description: 'We extract skills, generate preparation plans, and calculate your readiness score.',
    },
    {
      step: '3',
      title: 'Track & Improve',
      description: 'Mark skills as learned and watch your score improve in real-time.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Placement Readiness App
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-4">
            Your AI-powered companion for job interview preparation
          </p>
          <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
            Analyze job descriptions, extract required skills, get personalized study plans, 
            and track your readiness with live scoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/analyzer')}
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors border border-primary-500 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Try JD Analyzer
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to prepare for your dream job in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to supercharge your interview preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-gray-600">Skill Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">7-Day</div>
              <div className="text-gray-600">Preparation Plans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Live</div>
              <div className="text-gray-600">Score Tracking</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Start analyzing job descriptions and building your personalized preparation plan today.
          </p>
          <button
            onClick={() => navigate('/analyzer')}
            className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Analyzing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              <span className="font-semibold text-white">Placement Readiness App</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
