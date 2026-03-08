import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve coding challenges across multiple difficulty levels and topics.',
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with timed practice sessions.',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and insights.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ace Your Placement
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50 flex-1">
        <div className="max-w-6xl mx-auto">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
