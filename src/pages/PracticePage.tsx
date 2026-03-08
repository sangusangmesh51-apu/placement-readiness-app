import { Filter } from 'lucide-react';

export function PracticePage() {
  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', solved: true },
    { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', solved: true },
    { id: 3, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', solved: false },
    { id: 4, title: 'Best Time to Buy Stock', difficulty: 'Easy', category: 'Arrays', solved: false },
    { id: 5, title: 'Binary Tree Inorder', difficulty: 'Medium', category: 'Tree', solved: false },
    { id: 6, title: 'Longest Substring', difficulty: 'Medium', category: 'Strings', solved: false },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Practice Problems</h1>
          <p className="text-gray-600 mt-1">Sharpen your coding skills</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Title</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Difficulty</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {problem.solved ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{problem.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{problem.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
