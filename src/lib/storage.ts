import type { AnalysisResult, HistoryEntry, SkillConfidence } from '../types/analysis';

const STORAGE_KEY = 'placement_readiness_history';

// Validate if an entry matches the expected schema
function isValidEntry(entry: unknown): entry is AnalysisResult {
  if (!entry || typeof entry !== 'object') return false;
  
  const e = entry as Partial<AnalysisResult>;
  
  // Check required fields
  if (!e.id || typeof e.id !== 'string') return false;
  if (!e.createdAt || typeof e.createdAt !== 'string') return false;
  if (!e.jdText || typeof e.jdText !== 'string') return false;
  if (!e.extractedSkills || typeof e.extractedSkills !== 'object') return false;
  
  return true;
}

// Get all history entries (with corruption handling)
export function getHistory(): HistoryEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const entries: unknown[] = JSON.parse(data);
    const validEntries: AnalysisResult[] = [];
    let hasCorruption = false;
    
    for (const entry of entries) {
      if (isValidEntry(entry)) {
        validEntries.push(entry);
      } else {
        hasCorruption = true;
      }
    }
    
    // If corruption detected, clean up storage
    if (hasCorruption && validEntries.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validEntries));
    }
    
    return validEntries.map(e => ({
      id: e.id,
      createdAt: e.createdAt,
      company: e.company || '',
      role: e.role || '',
      readinessScore: e.finalScore ?? e.readinessScore ?? 0,
    }));
  } catch {
    return [];
  }
}

// Check if history has corrupted entries
export function hasCorruptedEntries(): boolean {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    
    const entries: unknown[] = JSON.parse(data);
    return entries.some(entry => !isValidEntry(entry));
  } catch {
    return true;
  }
}

// Get full analysis result by ID
export function getAnalysisById(id: string): AnalysisResult | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const entries: AnalysisResult[] = JSON.parse(data);
    return entries.find(e => e.id === id) || null;
  } catch {
    return null;
  }
}

// Get latest analysis
export function getLatestAnalysis(): AnalysisResult | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const entries: AnalysisResult[] = JSON.parse(data);
    if (entries.length === 0) return null;
    
    // Sort by createdAt descending and return first
    return entries.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  } catch {
    return null;
  }
}

// Save analysis to history
export function saveAnalysis(analysis: AnalysisResult): void {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const entries: AnalysisResult[] = data ? JSON.parse(data) : [];
    
    // Add new analysis at the beginning
    entries.unshift(analysis);
    
    // Keep only last 50 entries
    if (entries.length > 50) {
      entries.pop();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save analysis:', error);
  }
}

// Delete analysis by ID
export function deleteAnalysis(id: string): void {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    
    const entries: AnalysisResult[] = JSON.parse(data);
    const filtered = entries.filter(e => e.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete analysis:', error);
  }
}

// Calculate final score based on base score and confidence map
function calculateFinalScore(
  baseScore: number,
  confidenceMap: Record<string, SkillConfidence>
): number {
  let score = baseScore;
  
  Object.values(confidenceMap).forEach((confidence) => {
    if (confidence === 'know') {
      score += 2;
    } else {
      score -= 2;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}

// Update analysis (for skill confidence changes)
export function updateAnalysis(updatedAnalysis: AnalysisResult): void {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    
    const entries: AnalysisResult[] = JSON.parse(data);
    const index = entries.findIndex(e => e.id === updatedAnalysis.id);
    
    if (index !== -1) {
      // Recalculate final score based on confidence map
      const finalScore = calculateFinalScore(
        updatedAnalysis.baseScore,
        updatedAnalysis.skillConfidenceMap
      );
      
      // Update with new final score and timestamp
      const updated: AnalysisResult = {
        ...updatedAnalysis,
        finalScore,
        updatedAt: new Date().toISOString(),
      };
      
      entries[index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  } catch (error) {
    console.error('Failed to update analysis:', error);
  }
}

// Clear all history
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
