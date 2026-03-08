import type { 
  ExtractedSkills, 
  RoundChecklist, 
  DayPlan, 
  AnalysisResult,
  SkillCategory,
  RoundChecklistItem,
  DayPlanItem,
  RoundMappingItem,
  RoundMapping,
} from '../types/analysis';
import { extractSkills, hasAnySkills, getDetectedCategories, getAllSkills } from './skillExtractor';
import { generateCompanyIntel } from './companyIntel';
import { generateRoundMapping } from './roundMapping';

// Generate round-wise checklist based on detected skills
function generateChecklist(skills: ExtractedSkills): RoundChecklist[] {
  const categories = getDetectedCategories(skills);
  const hasSkill = (cat: SkillCategory) => skills[cat].length > 0;
  
  const checklist: RoundChecklist[] = [
    {
      round: 1,
      title: 'Aptitude / Basics',
      items: [
        'Practice quantitative aptitude problems (percentages, ratios, speed-distance)',
        'Solve logical reasoning puzzles (pattern recognition, series completion)',
        'Review verbal ability (grammar, comprehension, sentence correction)',
        'Complete 2 full-length mock aptitude tests',
        'Review basic computer fundamentals (hardware, software basics)',
      ],
    },
    {
      round: 2,
      title: 'DSA + Core CS',
      items: [
        hasSkill('coreCS') && skills.coreCS.includes('DSA') 
          ? `Master key DSA topics: Arrays, Linked Lists, Trees, Graphs, DP`
          : 'Review basic DSA: Arrays, Strings, Searching, Sorting',
        hasSkill('coreCS') && skills.coreCS.includes('OOP')
          ? 'Deep dive OOP concepts: Inheritance, Polymorphism, Encapsulation, Abstraction'
          : 'Understand basic OOP principles',
        hasSkill('coreCS') && skills.coreCS.includes('DBMS')
          ? 'Study DBMS: Normalization, Transactions, ACID, Indexing'
          : 'Learn basic database concepts',
        hasSkill('coreCS') && skills.coreCS.includes('OS')
          ? 'Review OS: Process scheduling, Memory management, Deadlocks'
          : 'Understand OS basics: Processes, Threads',
        hasSkill('coreCS') && skills.coreCS.includes('Networks')
          ? 'Study Networks: OSI model, TCP/IP, HTTP/HTTPS, DNS'
          : 'Learn networking fundamentals',
        'Practice 5 medium-level coding problems daily',
        'Review time/space complexity analysis',
      ].filter(Boolean) as string[],
    },
    {
      round: 3,
      title: 'Tech Interview (Projects + Stack)',
      items: [
        hasSkill('languages') 
          ? `Prepare ${skills.languages.slice(0, 2).join(', ')} interview questions`
          : 'Review programming language fundamentals',
        hasSkill('web') && skills.web.includes('React')
          ? 'Master React: Hooks, Context, State management, Virtual DOM'
          : hasSkill('web') ? `Study ${skills.web[0]} concepts` : 'Review web development basics',
        hasSkill('data') 
          ? `Prepare database questions: ${skills.data.slice(0, 2).join(', ')}`
          : 'Understand SQL basics and queries',
        hasSkill('cloudDevOps')
          ? `Review DevOps: ${skills.cloudDevOps.slice(0, 2).join(', ')}`
          : 'Learn basic deployment concepts',
        'Prepare 2 project deep-dives with architecture diagrams',
        'Practice explaining your approach to problem-solving',
        'Review system design basics (scalability, caching, load balancing)',
        'Prepare answers for "Why this company?" and "Why this role?"',
      ].filter(Boolean) as string[],
    },
    {
      round: 4,
      title: 'Managerial / HR',
      items: [
        'Prepare STAR-format answers for behavioral questions',
        'Practice "Tell me about yourself" (2-minute version)',
        'Research company culture, values, and recent news',
        'Prepare salary expectations and negotiation points',
        'Review your resume thoroughly - every point must be explainable',
        'Prepare questions to ask the interviewer',
        'Practice mock HR interviews with a friend',
      ],
    },
  ];

  return checklist;
}

// Generate 7-day plan based on detected skills
function generatePlan(skills: ExtractedSkills): DayPlan[] {
  const hasSkill = (cat: SkillCategory, skill?: string) => {
    if (!skills[cat].length) return false;
    if (skill) return skills[cat].includes(skill);
    return true;
  };

  return [
    {
      day: 1,
      title: 'Basics + Core CS',
      tasks: [
        'Morning: Aptitude practice (2 hours)',
        hasSkill('coreCS', 'OOP') ? 'Afternoon: Deep dive OOP concepts with examples' : 'Afternoon: Programming fundamentals review',
        hasSkill('coreCS', 'DBMS') ? 'Evening: DBMS concepts - Normalization, SQL queries' : 'Evening: Basic database concepts',
        'Night: Revise notes, mark doubts',
      ].filter(Boolean) as string[],
    },
    {
      day: 2,
      title: 'Core CS Continued',
      tasks: [
        'Morning: OS concepts - processes, threads, scheduling',
        hasSkill('coreCS', 'Networks') ? 'Afternoon: Networking - OSI model, protocols' : 'Afternoon: Computer fundamentals',
        'Evening: Solve 3 DSA problems (easy-medium)',
        'Night: Review mistakes, document learnings',
      ],
    },
    {
      day: 3,
      title: 'DSA + Coding Practice',
      tasks: [
        'Morning: Arrays and Strings (5 problems)',
        'Afternoon: Linked Lists and Trees (4 problems)',
        hasSkill('languages') ? `Evening: ${skills.languages[0]} specific coding questions` : 'Evening: Language-agnostic problem solving',
        'Night: Optimize solutions, check alternative approaches',
      ],
    },
    {
      day: 4,
      title: 'Advanced DSA',
      tasks: [
        'Morning: Dynamic Programming (3 problems)',
        'Afternoon: Graphs and advanced algorithms',
        'Evening: Mock coding interview (timed)',
        'Night: Review complexity analysis of all solutions',
      ],
    },
    {
      day: 5,
      title: 'Project + Resume Alignment',
      tasks: [
        'Morning: Polish resume - quantify achievements',
        'Afternoon: Prepare project presentations (2 deep dives)',
        hasSkill('web') ? 'Evening: Review web framework concepts' : 'Evening: Review tech stack fundamentals',
        'Night: Practice elevator pitch',
      ],
    },
    {
      day: 6,
      title: 'Mock Interview Questions',
      tasks: [
        'Morning: Technical mock interview',
        hasSkill('data') ? `Afternoon: Database design questions (${skills.data[0]})` : 'Afternoon: System design basics',
        'Evening: Behavioral question practice (STAR method)',
        'Night: Company research and culture fit prep',
      ],
    },
    {
      day: 7,
      title: 'Revision + Weak Areas',
      tasks: [
        'Morning: Review all weak areas from past 6 days',
        'Afternoon: Final DSA revision - focus on frequently asked',
        'Evening: Light aptitude practice',
        'Night: Early rest, prepare documents for interview day',
      ],
    },
  ];
}

// Generate interview questions based on detected skills
function generateQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = [];
  const hasSkill = (cat: SkillCategory, skill: string) => skills[cat].includes(skill);

  // Core CS questions
  if (hasSkill('coreCS', 'DSA')) {
    questions.push(
      'How would you optimize search in sorted data? Compare binary vs linear search.',
      'Explain the difference between array and linked list. When would you use each?',
      'How do you detect a cycle in a linked list?',
      'What is dynamic programming? Give an example problem.',
      'Explain quicksort and its time/space complexity.'
    );
  }

  if (hasSkill('coreCS', 'OOP')) {
    questions.push(
      'Explain the four pillars of OOP with real-world examples.',
      'What is the difference between abstraction and encapsulation?',
      'Explain polymorphism - compile-time vs runtime with examples.',
      'Why is multiple inheritance not allowed in Java?'
    );
  }

  if (hasSkill('coreCS', 'DBMS')) {
    questions.push(
      'Explain indexing and when it helps vs hurts performance.',
      'What is normalization? Explain 1NF, 2NF, 3NF.',
      'Difference between INNER JOIN and LEFT JOIN?',
      'Explain ACID properties with examples.'
    );
  }

  // Language-specific questions
  if (hasSkill('languages', 'Java')) {
    questions.push(
      'Explain the difference between String, StringBuilder, and StringBuffer.',
      'What is the Java Memory Model? Explain heap vs stack.',
      'How does garbage collection work in Java?'
    );
  }

  if (hasSkill('languages', 'Python')) {
    questions.push(
      'Explain Python decorators with an example.',
      'What are generators and iterators in Python?',
      'Difference between lists and tuples? When to use each?'
    );
  }

  if (hasSkill('languages', 'JavaScript') || hasSkill('languages', 'TypeScript')) {
    questions.push(
      'Explain closures in JavaScript with a practical example.',
      'What is the event loop? Explain microtasks vs macrotasks.',
      'Difference between == and ===? When would you use each?',
      'Explain prototypal inheritance in JavaScript.'
    );
  }

  // Web framework questions
  if (hasSkill('web', 'React')) {
    questions.push(
      'Explain state management options in React. Compare useState, useReducer, Context.',
      'What is the Virtual DOM and how does React use it?',
      'Explain useEffect hook and its dependency array.',
      'How would you optimize a slow React application?'
    );
  }

  if (hasSkill('web', 'Node.js')) {
    questions.push(
      'Explain the event-driven architecture of Node.js.',
      'What is the difference between require and import?',
      'How does Node.js handle asynchronous operations?'
    );
  }

  // Database questions
  if (hasSkill('data', 'SQL')) {
    questions.push(
      'Write a query to find the second highest salary.',
      'Explain the difference between WHERE and HAVING.',
      'How would you optimize a slow SQL query?'
    );
  }

  if (hasSkill('data', 'MongoDB')) {
    questions.push(
      'When would you choose MongoDB over SQL databases?',
      'Explain the aggregation pipeline in MongoDB.',
      'How does sharding work in MongoDB?'
    );
  }

  // Cloud/DevOps questions
  if (hasSkill('cloudDevOps', 'AWS')) {
    questions.push(
      'Explain the difference between EC2 and Lambda.',
      'What is an S3 bucket and what are its use cases?',
      'How would you set up auto-scaling for an application?'
    );
  }

  if (hasSkill('cloudDevOps', 'Docker')) {
    questions.push(
      'What is the difference between a Docker image and container?',
      'Explain Docker volumes and when to use them.',
      'How does Docker networking work?'
    );
  }

  // Testing questions
  if (hasSkill('testing', 'Selenium')) {
    questions.push(
      'What is the difference between implicit and explicit waits?',
      'How would you handle dynamic web elements in Selenium?',
      'Explain the Page Object Model pattern.'
    );
  }

  // General questions if no specific skills detected
  if (questions.length === 0) {
    questions.push(
      'Tell me about yourself and your technical background.',
      'What projects have you worked on? Explain your role.',
      'How do you approach learning new technologies?',
      'Describe a challenging problem you solved recently.',
      'Where do you see yourself in 5 years?',
      'Why do you want to work at our company?',
      'What are your strengths and weaknesses?',
      'How do you handle tight deadlines and pressure?',
      'Explain your approach to debugging code.',
      'What makes you a good fit for this role?'
    );
  }

  // Return up to 10 questions
  return questions.slice(0, 10);
}

// Calculate readiness score
function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdLength: number
): number {
  let score = 35; // Base score

  // +5 per detected category (max 30)
  const categories = getDetectedCategories(skills);
  score += Math.min(categories.length * 5, 30);

  // +10 if company name provided
  if (company.trim().length > 0) score += 10;

  // +10 if role provided
  if (role.trim().length > 0) score += 10;

  // +10 if JD length > 800 chars
  if (jdLength > 800) score += 10;

  // Cap at 100
  return Math.min(score, 100);
}

// Initialize skill confidence map with all skills set to 'practice'
function initializeSkillConfidenceMap(skills: ExtractedSkills): Record<string, 'know' | 'practice'> {
  const map: Record<string, 'know' | 'practice'> = {};
  
  getAllSkills(skills).forEach((skill) => {
    map[skill] = 'practice';
  });
  
  return map;
}

// Convert legacy round mapping to new format
function convertRoundMapping(rounds: RoundMapping[]): RoundMappingItem[] {
  return rounds.map(round => ({
    roundTitle: round.title,
    focusAreas: [round.description],
    whyItMatters: round.whyItMatters,
  }));
}

// Convert legacy checklist to new format
function convertChecklist(rounds: RoundChecklist[]): RoundChecklistItem[] {
  return rounds.map(round => ({
    roundTitle: round.title,
    items: round.items,
  }));
}

// Convert legacy plan to new format
function convertPlan(days: DayPlan[]): DayPlanItem[] {
  return days.map(day => ({
    day: day.day,
    focus: day.title,
    tasks: day.tasks,
  }));
}

// Main analysis function
export function analyzeJD(
  company: string,
  role: string,
  jdText: string
): AnalysisResult {
  const extractedSkills = extractSkills(jdText);
  const now = new Date().toISOString();
  
  // Generate legacy outputs
  const legacyChecklist = generateChecklist(extractedSkills);
  const legacyPlan = generatePlan(extractedSkills);
  const legacyRoundMapping = generateRoundMapping('startup', extractedSkills);
  
  // Calculate base score
  const baseScore = calculateReadinessScore(extractedSkills, company, role, jdText.length);
  
  // Initialize confidence map
  const skillConfidenceMap = initializeSkillConfidenceMap(extractedSkills);
  
  // Calculate initial final score (same as base at creation)
  const finalScore = baseScore;
  
  // Generate company intel
  const companyIntel = generateCompanyIntel(company, jdText);
  
  // Generate questions
  const questions = generateQuestions(extractedSkills);

  // Build standardized result
  const result: AnalysisResult = {
    // Required identifiers
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    
    // Input fields
    company: company || '',
    role: role || '',
    jdText,
    
    // Extracted data
    extractedSkills,
    
    // Generated outputs (new format)
    roundMapping: convertRoundMapping(legacyRoundMapping),
    checklist: convertChecklist(legacyChecklist),
    plan7Days: convertPlan(legacyPlan),
    questions,
    
    // Scoring
    baseScore,
    skillConfidenceMap,
    finalScore,
    
    // Optional company intel
    companyIntel,
    
    // Legacy fields for backward compatibility
    readinessScore: baseScore,
    plan: legacyPlan,
    checklistLegacy: legacyChecklist,
    roundMappingLegacy: companyIntel 
      ? generateRoundMapping(companyIntel.size, extractedSkills)
      : legacyRoundMapping,
  };

  return result;
}
