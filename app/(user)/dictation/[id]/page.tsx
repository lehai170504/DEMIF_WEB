"use client";

import { use } from "react";
import { DictationPlayer } from "@/components/dictation/dictation-player";
import { useUserLessonDetail } from "@/hooks/use-lesson";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";

export default function DictationExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params for Next.js 15
  const { id } = use(params);
  const { data: lesson, isLoading, error } = useUserLessonDetail(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !lesson) {
    notFound();
  }

  return <DictationPlayer lesson={lesson} />;
}
