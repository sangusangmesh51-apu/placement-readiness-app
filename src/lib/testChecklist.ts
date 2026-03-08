// Test checklist storage - no external type imports needed

const TEST_CHECKLIST_KEY = 'placement_readiness_test_checklist';

export interface TestItem {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
}

export interface TestChecklist {
  items: TestItem[];
  lastUpdated: string;
}

const DEFAULT_TEST_ITEMS: TestItem[] = [
  {
    id: 'jd-required',
    label: 'JD required validation works',
    hint: 'Go to /analyzer, try to submit empty JD. Button should be disabled.',
    checked: false,
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Enter JD with <200 characters. Amber warning should appear below textarea.',
    checked: false,
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze a JD with React, Java, AWS. Verify skills appear in correct categories.',
    checked: false,
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Test with "Amazon" (enterprise) vs "TechStart" (startup). Rounds should differ.',
    checked: false,
  },
  {
    id: 'score-deterministic',
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice. Base score should be identical.',
    checked: false,
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On results page, toggle skills. Score should update immediately (+2/-2).',
    checked: false,
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, refresh page. Toggles and score should remain.',
    checked: false,
  },
  {
    id: 'history-loads',
    label: 'History saves and loads correctly',
    hint: 'Create analysis, go to /history. Entry should appear with correct info.',
    checked: false,
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click "Copy Plan" or "Copy Checklist". Paste to verify content matches.',
    checked: false,
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open DevTools, visit /dashboard, /analyzer, /results. No red errors.',
    checked: false,
  },
];

export function getTestChecklist(): TestChecklist {
  try {
    const data = localStorage.getItem(TEST_CHECKLIST_KEY);
    if (!data) {
      return {
        items: [...DEFAULT_TEST_ITEMS],
        lastUpdated: new Date().toISOString(),
      };
    }

    const parsed = JSON.parse(data) as TestChecklist;
    
    // Validate structure
    if (!parsed.items || !Array.isArray(parsed.items)) {
      return {
        items: [...DEFAULT_TEST_ITEMS],
        lastUpdated: new Date().toISOString(),
      };
    }

    // Merge with defaults to handle new items
    const mergedItems = DEFAULT_TEST_ITEMS.map(defaultItem => {
      const savedItem = parsed.items.find(i => i.id === defaultItem.id);
      return savedItem ? { ...defaultItem, checked: savedItem.checked } : defaultItem;
    });

    return {
      items: mergedItems,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch {
    return {
      items: [...DEFAULT_TEST_ITEMS],
      lastUpdated: new Date().toISOString(),
    };
  }
}

export function toggleTestItem(itemId: string): void {
  try {
    const checklist = getTestChecklist();
    const item = checklist.items.find(i => i.id === itemId);
    
    if (item) {
      item.checked = !item.checked;
      checklist.lastUpdated = new Date().toISOString();
      localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(checklist));
    }
  } catch (error) {
    console.error('Failed to toggle test item:', error);
  }
}

export function resetTestChecklist(): void {
  try {
    localStorage.removeItem(TEST_CHECKLIST_KEY);
  } catch (error) {
    console.error('Failed to reset test checklist:', error);
  }
}

export function getPassedCount(): number {
  const checklist = getTestChecklist();
  return checklist.items.filter(item => item.checked).length;
}

export function getTotalCount(): number {
  return DEFAULT_TEST_ITEMS.length;
}

export function isAllTestsPassed(): boolean {
  return getPassedCount() === getTotalCount();
}

// For testing: simulate corrupt entry to verify history robustness
export function simulateCorruptHistoryEntry(): void {
  try {
    const key = 'placement_readiness_history';
    const data = localStorage.getItem(key);
    const entries: unknown[] = data ? JSON.parse(data) : [];
    
    // Add a corrupted entry
    entries.push({
      id: 'corrupt-test-entry',
      // Missing required fields
    });
    
    localStorage.setItem(key, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to simulate corrupt entry:', error);
  }
}
