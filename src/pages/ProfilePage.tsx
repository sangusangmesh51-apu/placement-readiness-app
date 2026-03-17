import { useState, useEffect } from 'react';
import { User, Mail, Building2, GraduationCap, Edit, Check, X, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { getProfile, saveProfile, type ProfileData, DEFAULT_PROFILE } from '../lib/profileStorage';

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const loadedProfile = getProfile();
    setProfile(loadedProfile);
    setFormData(loadedProfile);
    setIsLoaded(true);
  }, []);

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    saveProfile(formData);
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

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
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="text-2xl font-bold bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/50"
                  placeholder="Your Name"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.fullName}</h2>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className="mt-1 text-primary-100 bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/50"
                  placeholder="Your Course"
                />
              ) : (
                <p className="text-primary-100">{profile.course}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900 truncate">{profile.fullName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900 truncate">{profile.email}</p>
                )}
              </div>
            </div>

            {/* Course */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">Course</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900 truncate">{profile.course}</p>
                )}
              </div>
            </div>

            {/* University */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">University</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => handleChange('university', e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900 truncate">{profile.university}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+1 234 567 8900"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{profile.phone || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">Location</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="City, Country"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{profile.location || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LinkedIn */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600">LinkedIn</p>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://linkedin.com/in/..."
                    />
                  ) : (
                    <p className="font-medium text-gray-900 truncate">
                      {profile.linkedin ? (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          View Profile
                        </a>
                      ) : 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600">GitHub</p>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => handleChange('github', e.target.value)}
                      className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://github.com/..."
                    />
                  ) : (
                    <p className="font-medium text-gray-900 truncate">
                      {profile.github ? (
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          View Profile
                        </a>
                      ) : 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Portfolio */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600">Portfolio</p>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => handleChange('portfolio', e.target.value)}
                      className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://..."
                    />
                  ) : (
                    <p className="font-medium text-gray-900 truncate">
                      {profile.portfolio ? (
                        <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          View Portfolio
                        </a>
                      ) : 'Not set'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
