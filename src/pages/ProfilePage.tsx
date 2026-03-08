import { User, Mail, Building2, GraduationCap, Edit } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary-600" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-primary-100">Computer Science Student</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">John Doe</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">john.doe@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-medium text-gray-900">B.Tech Computer Science</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">University</p>
                <p className="font-medium text-gray-900">Example University</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
