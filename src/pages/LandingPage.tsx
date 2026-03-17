import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Zap,
  ArrowRight,
  GraduationCap,
  Briefcase,
  LineChart,
  BookOpen,
  Users
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'JD Analyzer',
      description: 'Paste any job description and get instant skill extraction, readiness score, and personalized preparation plan.',
      color: 'bg-blue-500',
    },
    {
      icon: Target,
      title: 'Smart Preparation',
      description: 'Get round-wise checklists, 7-day study plans, and company-specific interview guidance.',
      color: 'bg-green-500',
    },
    {
      icon: Zap,
      title: 'Live Score Tracking',
      description: 'Toggle skills you know and watch your readiness score update in real-time.',
      color: 'bg-purple-500',
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

  const additionalFeatures = [
    {
      icon: Briefcase,
      title: 'Job Tracking',
      description: 'Save and organize job listings you\'re interested in.',
    },
    {
      icon: LineChart,
      title: 'Progress Analytics',
      description: 'Visualize your preparation progress over time.',
    },
    {
      icon: BookOpen,
      title: 'Study Resources',
      description: 'Curated learning materials for each skill.',
    },
    {
      icon: Users,
      title: 'Interview Prep',
      description: 'Practice with company-specific questions.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Fixed with solid color background */}
      <section className="relative bg-indigo-600 text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">AI-Powered Interview Preparation</span>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Placement Readiness
            <span className="block text-indigo-200">App</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-indigo-100 mb-4 max-w-2xl mx-auto">
            Your AI-powered companion for job interview preparation
          </p>
          <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
            Analyze job descriptions, extract required skills, get personalized study plans, 
            and track your readiness with live scoring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/analyzer')}
              className="group bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-800 transition-all border-2 border-indigo-400 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Try JD Analyzer
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-indigo-200 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No Signup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Local Storage</span>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Everything you need to prepare for your dream job in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Three simple steps to supercharge your interview preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative text-center">
                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-indigo-100"></div>
                )}
                <div className="relative inline-flex w-16 h-16 bg-indigo-600 text-white rounded-full items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">More Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Everything you need to land your dream job.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">10+</div>
              <div className="text-gray-600 font-medium">Skill Categories</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">7-Day</div>
              <div className="text-gray-600 font-medium">Preparation Plans</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">Live</div>
              <div className="text-gray-600 font-medium">Score Tracking</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Start analyzing job descriptions and building your personalized preparation plan today.
          </p>
          <button
            onClick={() => navigate('/analyzer')}
            className="group bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            Start Analyzing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-indigo-500" />
              <span className="font-bold text-white text-lg">Placement Readiness App</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
