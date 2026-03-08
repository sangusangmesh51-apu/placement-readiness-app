import type { RoundMapping, CompanySize, ExtractedSkills } from '../types/analysis';

// Generate round mapping based on company size and detected skills
export function generateRoundMapping(
  size: CompanySize,
  skills: ExtractedSkills
): RoundMapping[] {
  const hasSkill = (category: keyof ExtractedSkills, skill?: string) => {
    if (!skills[category].length) return false;
    if (skill) return skills[category].includes(skill);
    return true;
  };

  const hasDSA = hasSkill('coreCS', 'DSA');
  const hasWeb = hasSkill('web');
  const hasCloud = hasSkill('cloud');

  // Enterprise round mapping
  if (size === 'enterprise') {
    return [
      {
        round: 1,
        title: 'Online Assessment',
        description: hasDSA 
          ? 'DSA problems (arrays, strings, basic algorithms) + Aptitude (quantitative, logical, verbal)'
          : 'Aptitude test + Basic programming concepts',
        whyItMatters: 'Enterprise companies use this as a filter to shortlist candidates. High volume of applicants means you need to clear cutoff scores to proceed.',
      },
      {
        round: 2,
        title: 'Technical Interview - I',
        description: hasDSA
          ? 'In-depth DSA: Trees, Graphs, DP, Recursion. Live coding on shared editor.'
          : 'Programming fundamentals, problem-solving approach, code quality',
        whyItMatters: 'Tests your core CS fundamentals. Enterprise roles require strong algorithmic thinking for scalable systems.',
      },
      {
        round: 3,
        title: 'Technical Interview - II',
        description: hasWeb
          ? 'System design basics + Project deep dive + Stack-specific questions (React/Node/etc)'
          : 'Core CS concepts (OS, DBMS, Networks) + Project discussion',
        whyItMatters: 'Evaluates your practical knowledge and ability to apply concepts. Project discussion reveals your ownership and depth.',
      },
      {
        round: 4,
        title: 'Managerial / HR Round',
        description: 'Behavioral questions, culture fit, salary discussion, role expectations',
        whyItMatters: 'Assesses soft skills, communication, and alignment with company values. Often the final decision-maker.',
      },
    ];
  }

  // Mid-size round mapping
  if (size === 'midsize') {
    return [
      {
        round: 1,
        title: 'Coding Challenge',
        description: hasDSA
          ? '2-3 DSA problems (medium difficulty) + Optional take-home assignment'
          : 'Practical coding task relevant to the role',
        whyItMatters: 'Mid-size companies balance speed with thoroughness. This round filters for practical coding ability.',
      },
      {
        round: 2,
        title: 'Technical Interview',
        description: hasWeb
          ? 'DSA + System design discussion + Framework-specific deep dive'
          : 'DSA + Core CS + Project architecture discussion',
        whyItMatters: 'Comprehensive technical evaluation. They want to see both fundamentals and practical application.',
      },
      {
        round: 3,
        title: 'System Design / Architecture',
        description: hasCloud
          ? 'Design a scalable system using cloud services. Discuss trade-offs.'
          : 'High-level design of a feature or component. Database schema design.',
        whyItMatters: 'Mid-size companies need engineers who can architect solutions independently. Tests system thinking.',
      },
      {
        round: 4,
        title: 'Culture & Fit',
        description: 'Team fit, career goals, problem-solving approach discussion',
        whyItMatters: 'Cultural alignment is crucial in smaller teams. They want collaborative, growth-oriented engineers.',
      },
    ];
  }

  // Startup round mapping (default)
  return [
    {
      round: 1,
      title: 'Practical Coding',
      description: hasWeb
        ? 'Build a small feature or fix bugs in existing code. May include React/Node tasks.'
        : 'Solve real-world problems. Focus on working code over optimal algorithms.',
      whyItMatters: 'Startups prioritize shipping working code. This simulates actual day-to-day work you will do.',
    },
    {
      round: 2,
      title: 'System & Architecture Discussion',
      description: hasCloud
        ? 'Discuss how you would build/deploy a feature. Cloud architecture, CI/CD approach.'
        : 'Talk through your past projects. Architecture decisions and trade-offs.',
      whyItMatters: 'Startups need generalists who can think end-to-end. Shows you can own features independently.',
    },
    {
      round: 3,
      title: 'Culture & Founder Chat',
      description: 'Meet the team. Discuss startup mindset, adaptability, growth potential.',
      whyItMatters: 'Startups are high-energy, ambiguous environments. They need people who thrive in chaos and wear multiple hats.',
    },
  ];
}
