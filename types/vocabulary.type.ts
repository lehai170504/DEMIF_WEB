export interface VocabularyItemDto {
  id: string;
  userId: string;
  lessonId: string;
  lessonTitle: string;
  lessonCategory: string;
  topic: string;
  word: string;
  meaning: string;
  contextSentence: string;
  note: string;
  reviewCount: number;
  correctReviews: number;
  isMastered: boolean;
  lastReviewedAt: string | null;
  nextReviewAt: string;
  masteredAt: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetVocabularyParams {
  lessonId?: string;
  topic?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedVocabularyResult {
  items: VocabularyItemDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CreateVocabularyPayload {
  lessonId: string;
  word: string;
  topic: string;
  meaning: string;
  contextSentence?: string;
  note?: string;
}

export interface VocabularyOverviewResponse {
  totalCount: number;
  dueCount: number;
  masteredCount: number;
  learningCount: number;
  topicCount: number;
  lessonCount: number;
  recentCount: number;
  masteryRate: number;
  recentItems: VocabularyItemDto[];
}

export interface VocabularySuggestionItem {
  word: string;
  normalizedWord: string;
  topic: string;
  lessonId: string;
  lessonTitle: string;
  lessonCategory: string;
  contextSentence: string;
  frequency: number;
  isAlreadySaved: boolean;
}

export interface VocabularySuggestionsResponse {
  lessonId: string;
  lessonTitle: string;
  lessonCategory: string;
  topic: string;
  sourceTextLength: number;
  totalCandidates: number;
  items: VocabularySuggestionItem[];
}

export interface ReviewVocabularyPayload {
  isCorrect: boolean;
}
