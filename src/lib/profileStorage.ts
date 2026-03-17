// Profile storage - manages user profile data

export interface ProfileData {
  fullName: string;
  email: string;
  course: string;
  university: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  bio: string;
}

const PROFILE_KEY = 'placement_prep_profile';

export const DEFAULT_PROFILE: ProfileData = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  course: 'B.Tech Computer Science',
  university: 'Example University',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  portfolio: '',
  bio: '',
};

export function getProfile(): ProfileData {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: ProfileData): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save profile:', error);
  }
}

export function updateProfile(updates: Partial<ProfileData>): void {
  const current = getProfile();
  saveProfile({ ...current, ...updates });
}
