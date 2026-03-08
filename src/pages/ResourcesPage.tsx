import { BookOpen, FileText, Video, ExternalLink } from 'lucide-react';

export function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: 'Data Structures Cheat Sheet',
      type: 'PDF',
      icon: FileText,
      description: 'Quick reference for arrays, linked lists, trees, and graphs.',
    },
    {
      id: 2,
      title: 'System Design Fundamentals',
      type: 'Video',
      icon: Video,
      description: 'Complete course on designing scalable systems.',
    },
    {
      id: 3,
      title: 'Behavioral Interview Guide',
      type: 'Article',
      icon: BookOpen,
      description: 'STAR method and common questions with sample answers.',
    },
    {
      id: 4,
      title: 'SQL Interview Questions',
      type: 'PDF',
      icon: FileText,
      description: '50+ SQL problems with detailed solutions.',
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-600';
      case 'Video': return 'bg-purple-100 text-purple-600';
      case 'Article': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-600 mt-1">Study materials and guides to help you prepare</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(resource.type)}`}>
                <resource.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {resource.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Access Resource
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
