import * as z from "zod";

export const createVocabularySchema = z.object({
  lessonId: z.string().uuid({ message: "Lesson ID phải đúng định dạng UUID" }),
  word: z.string().min(1, { message: "Vui lòng nhập từ vựng" }),
  topic: z.string().min(1, { message: "Vui lòng nhập chủ đề" }),
  meaning: z.string().min(1, { message: "Vui lòng nhập ý nghĩa" }),
  contextSentence: z.string().optional(),
  note: z.string().optional(),
});

export type CreateVocabularyFormValues = z.infer<typeof createVocabularySchema>;
