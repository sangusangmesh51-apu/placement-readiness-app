import { ClipboardList, Clock, Calendar } from 'lucide-react';

export function AssessmentsPage() {
  const assessments = [
    { 
      id: 1, 
      title: 'Frontend Developer Mock Interview', 
      duration: '45 min', 
      scheduled: 'Tomorrow, 2:00 PM',
      type: 'Technical'
    },
    { 
      id: 2, 
      title: 'Data Structures Assessment', 
      duration: '60 min', 
      scheduled: 'Available now',
      type: 'Coding'
    },
    { 
      id: 3, 
      title: 'System Design Interview', 
      duration: '90 min', 
      scheduled: 'Friday, 10:00 AM',
      type: 'Technical'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
        <p className="text-gray-600 mt-1">Track your upcoming and completed assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-primary-600" />
              </div>
              <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium">
                {assessment.type}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{assessment.title}</h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{assessment.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{assessment.scheduled}</span>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
