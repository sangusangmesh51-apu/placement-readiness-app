import { SKILL_CATEGORIES, DEFAULT_SKILLS, type ExtractedSkills, type SkillCategory } from '../types/analysis';

// Normalize text for matching
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+/\s-]/g, ' ');
}

// Check if keyword exists in text (handles variations)
function hasKeyword(text: string, keyword: string): boolean {
  const normalized = normalizeText(text);
  const normalizedKeyword = keyword.toLowerCase();
  
  // Handle special cases
  const variations: Record<string, string[]> = {
    'c++': ['c++', 'cpp', 'c plus plus'],
    'c#': ['c#', 'csharp', 'c sharp'],
    'next.js': ['next.js', 'nextjs', 'next js'],
    'node.js': ['node.js', 'nodejs', 'node js'],
    'ci/cd': ['ci/cd', 'cicd', 'ci cd', 'continuous integration'],
    'dsa': ['dsa', 'data structures', 'algorithms', 'data structure'],
    'oop': ['oop', 'object oriented', 'object-oriented'],
    'dbms': ['dbms', 'database management'],
    'os': ['os', 'operating system'],
    'rest': ['rest', 'restful', 'rest api', 'restful api'],
  };
  
  const keywordVariations = variations[normalizedKeyword] || [normalizedKeyword];
  return keywordVariations.some(v => normalized.includes(v));
}

export function extractSkills(jdText: string): ExtractedSkills {
  const skills: ExtractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: [],
  };

  (Object.keys(SKILL_CATEGORIES) as SkillCategory[]).forEach((category) => {
    SKILL_CATEGORIES[category].forEach((skill) => {
      if (hasKeyword(jdText, skill)) {
        skills[category].push(skill);
      }
    });
  });

  // If no skills detected, populate 'other' with defaults
  if (!hasAnySkills(skills)) {
    skills.other = [...DEFAULT_SKILLS];
  }

  return skills;
}

export function hasAnySkills(skills: ExtractedSkills): boolean {
  // Check all categories except 'other' for detected skills
  const categoriesToCheck: SkillCategory[] = ['coreCS', 'languages', 'web', 'data', 'cloud', 'testing'];
  return categoriesToCheck.some(cat => skills[cat].length > 0);
}

export function getDetectedCategories(skills: ExtractedSkills): SkillCategory[] {
  return (Object.keys(skills) as SkillCategory[]).filter(
    category => skills[category].length > 0
  );
}

// Get all skills as flat array (for confidence map initialization)
export function getAllSkills(skills: ExtractedSkills): string[] {
  return Object.values(skills).flat();
}
