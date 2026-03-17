import { BookOpen, FileText, Video, ExternalLink, Link as LinkIcon } from 'lucide-react';

export function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: 'Data Structures Cheat Sheet',
      type: 'PDF',
      icon: FileText,
      description: 'Quick reference for arrays, linked lists, trees, and graphs.',
      url: 'https://www.geeksforgeeks.org/data-structures-cheat-sheet/',
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 2,
      title: 'System Design Fundamentals',
      type: 'Video',
      icon: Video,
      description: 'Complete course on designing scalable systems.',
      url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 3,
      title: 'Behavioral Interview Guide',
      type: 'Article',
      icon: BookOpen,
      description: 'STAR method and common questions with sample answers.',
      url: 'https://www.themuse.com/advice/behavioral-interview-questions-answers',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 4,
      title: 'SQL Interview Questions',
      type: 'PDF',
      icon: FileText,
      description: '50+ SQL problems with detailed solutions.',
      url: 'https://www.geeksforgeeks.org/sql-interview-questions/',
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 5,
      title: 'LeetCode Top 150',
      type: 'Article',
      icon: LinkIcon,
      description: 'Must-solve coding interview problems with solutions.',
      url: 'https://leetcode.com/studyplan/top-interview-150/',
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 6,
      title: 'JavaScript Interview Questions',
      type: 'Article',
      icon: BookOpen,
      description: 'Comprehensive JS concepts for frontend interviews.',
      url: 'https://github.com/sudheerj/javascript-interview-questions',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-600 mt-1">Study materials and guides to help you prepare</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${resource.color}`}>
                <resource.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {resource.title}
                  </h3>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {resource.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                <span className="inline-flex items-center gap-1 text-primary-600 group-hover:text-primary-700 text-sm font-medium group-hover:gap-2 transition-all">
                  Access Resource
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
