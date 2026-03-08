// Types for JD Analysis System - Strict Schema

export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloud: string[];
  testing: string[];
  other: string[];
}

export interface RoundChecklistItem {
  roundTitle: string;
  items: string[];
}

export interface DayPlanItem {
  day: number;
  focus: string;
  tasks: string[];
}

export interface RoundMappingItem {
  roundTitle: string;
  focusAreas: string[];
  whyItMatters: string;
}

export type SkillConfidence = 'know' | 'practice';
export type CompanySize = 'startup' | 'midsize' | 'enterprise';

export interface CompanyIntel {
  name: string;
  industry: string;
  size: CompanySize;
  sizeLabel: string;
  hiringFocus: string;
}

// Legacy interfaces for backward compatibility
export interface RoundChecklist {
  round: number;
  title: string;
  items: string[];
}

export interface DayPlan {
  day: number;
  title: string;
  tasks: string[];
}

export interface RoundMapping {
  round: number;
  title: string;
  description: string;
  whyItMatters: string;
}

// Strict Analysis Result Schema
export interface AnalysisResult {
  // Required identifiers
  id: string;
  createdAt: string;
  updatedAt: string;
  
  // Input fields (always present, may be empty)
  company: string;
  role: string;
  jdText: string;
  
  // Extracted data (always present, arrays may be empty)
  extractedSkills: ExtractedSkills;
  
  // Generated outputs (always present)
  roundMapping: RoundMappingItem[];
  checklist: RoundChecklistItem[];
  plan7Days: DayPlanItem[];
  questions: string[];
  
  // Scoring (always present)
  baseScore: number;
  skillConfidenceMap: Record<string, SkillConfidence>;
  finalScore: number;
  
  // Optional company intel
  companyIntel?: CompanyIntel;
  
  // Legacy fields for backward compatibility
  readinessScore?: number;
  plan?: DayPlan[];
  checklistLegacy?: RoundChecklist[];
  roundMappingLegacy?: RoundMapping[];
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  readinessScore: number;
}

export const SKILL_CATEGORIES = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
} as const;

export type SkillCategory = keyof typeof SKILL_CATEGORIES;

// Default skills when none detected
export const DEFAULT_SKILLS = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];
