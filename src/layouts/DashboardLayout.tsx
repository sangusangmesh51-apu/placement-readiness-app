import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code2, 
  ClipboardList, 
  BookOpen, 
  User,
  GraduationCap,
  Sparkles,
  History,
  CheckCircle2,
  Rocket
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/analyzer', label: 'JD Analyzer', icon: Sparkles },
  { path: '/history', label: 'History', icon: History },
  { path: '/practice', label: 'Practice', icon: Code2 },
  { path: '/assessments', label: 'Assessments', icon: ClipboardList },
  { path: '/resources', label: 'Resources', icon: BookOpen },
  { path: '/profile', label: 'Profile', icon: User },
];

const devNavItems = [
  { path: '/prp/07-test', label: 'Test Checklist', icon: CheckCircle2 },
  { path: '/prp/08-ship', label: 'Ship', icon: Rocket },
];

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Placement Prep</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Dev Tools Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Dev Tools
            </p>
            <ul className="space-y-1">
              {devNavItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-green-50 text-green-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
