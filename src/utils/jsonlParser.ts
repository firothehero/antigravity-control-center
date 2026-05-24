import { TranscriptStep } from '../models';

export function parseJsonl(content: string): TranscriptStep[] {
  if (!content) {
    return [];
  }
  
  const lines = content.split('\n');
  const steps: TranscriptStep[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    try {
      const step = JSON.parse(trimmed) as TranscriptStep;
      steps.push(step);
    } catch (e) {
      // Skip corrupted lines silently
    }
  }
  
  return steps;
}

export interface PaginatedTranscript {
  steps: TranscriptStep[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function parseJsonlPaginated(
  content: string,
  page: number = 1,
  pageSize: number = 50
): PaginatedTranscript {
  const allSteps = parseJsonl(content);
  const totalCount = allSteps.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(totalPages, Math.max(1, page));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const steps = allSteps.slice(startIndex, endIndex);
  
  return {
    steps,
    totalCount,
    totalPages,
    currentPage
  };
}
