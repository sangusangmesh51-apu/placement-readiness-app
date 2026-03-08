import type { CompanyIntel, CompanySize } from '../types/analysis';

// Known enterprise companies
const ENTERPRISE_COMPANIES = [
  'amazon', 'microsoft', 'google', 'apple', 'meta', 'facebook', 'netflix',
  'oracle', 'ibm', 'sap', 'salesforce', 'adobe', 'intel', 'cisco',
  'infosys', 'tcs', 'wipro', 'hcl', 'tech mahindra', 'cognizant',
  'accenture', 'deloitte', 'ey', 'kpmg', 'pwc',
  'jpmorgan', 'goldman sachs', 'morgan stanley', 'bank of america',
  'walmart', 'target', 'best buy', 'home depot',
  'verizon', 'at&t', 'comcast',
  'siemens', 'ge', 'philips', 'samsung', 'sony',
  'toyota', 'honda', 'ford', 'gm',
  'pfizer', 'johnson & johnson', 'merck', 'novartis',
];

// Known mid-size companies (examples)
const MIDSIZE_COMPANIES = [
  'zoho', 'freshworks', 'postman', 'razorpay', 'zerodha',
  'swiggy', 'zomato', 'ola', 'uber india', 'ola cabs',
  'byju', 'unacademy', 'vedantu', 'toppr',
  'paytm', 'phonepe', 'mobikwik',
  'dream11', 'mpl', 'games24x7',
  'cred', 'groww', 'upstox',
];

// Industry keywords for inference
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  'Technology Services': ['software', 'it services', 'consulting', 'solutions', 'tech', 'digital'],
  'Finance & Banking': ['bank', 'finance', 'fintech', 'investment', 'trading', 'insurance', 'payments'],
  'Healthcare': ['health', 'medical', 'pharma', 'biotech', 'clinical', 'hospital'],
  'E-commerce': ['e-commerce', 'retail', 'shopping', 'marketplace', 'delivery', 'logistics'],
  'Education': ['education', 'learning', 'edtech', 'training', 'academy', 'university'],
  'Entertainment': ['media', 'entertainment', 'gaming', 'streaming', 'content', 'social'],
  'Manufacturing': ['manufacturing', 'automotive', 'hardware', 'electronics', 'industrial'],
  'Telecommunications': ['telecom', 'communication', 'network', 'wireless', 'broadband'],
};

// Infer company size based on name
function inferCompanySize(companyName: string): CompanySize {
  const normalized = companyName.toLowerCase().trim();
  
  if (ENTERPRISE_COMPANIES.some(c => normalized.includes(c))) {
    return 'enterprise';
  }
  
  if (MIDSIZE_COMPANIES.some(c => normalized.includes(c))) {
    return 'midsize';
  }
  
  // Default to startup for unknown companies
  return 'startup';
}

// Get size label
function getSizeLabel(size: CompanySize): string {
  const labels: Record<CompanySize, string> = {
    startup: '< 200 employees',
    midsize: '200 - 2,000 employees',
    enterprise: '2,000+ employees',
  };
  return labels[size];
}

// Infer industry from company name and JD
function inferIndustry(companyName: string, jdText: string): string {
  const text = (companyName + ' ' + jdText).toLowerCase();
  
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      return industry;
    }
  }
  
  return 'Technology Services';
}

// Get hiring focus based on company size
function getHiringFocus(size: CompanySize): string {
  const focus: Record<CompanySize, string> = {
    startup: 'Practical problem solving + stack depth. Expect hands-on coding, system design discussions, and culture fit. Less emphasis on textbook DSA, more on real-world application.',
    midsize: 'Balanced approach. Solid DSA fundamentals plus practical skills. May include take-home assignments and architecture discussions.',
    enterprise: 'Structured DSA + core fundamentals. Expect rigorous algorithm rounds, standardized processes, and deep CS concept evaluation.',
  };
  return focus[size];
}

// Generate company intel
export function generateCompanyIntel(companyName: string, jdText: string): CompanyIntel | undefined {
  if (!companyName.trim()) {
    return undefined;
  }
  
  const size = inferCompanySize(companyName);
  
  return {
    name: companyName,
    industry: inferIndustry(companyName, jdText),
    size,
    sizeLabel: getSizeLabel(size),
    hiringFocus: getHiringFocus(size),
  };
}
