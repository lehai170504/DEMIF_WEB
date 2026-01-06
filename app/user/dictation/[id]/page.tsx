import { DictationExercise } from "@/components/dictation/dictation-exercise"
import { lessons } from "@/lib/data/lessons"
import { notFound } from "next/navigation"

export default function DictationExercisePage({ params }: { params: { id: string } }) {
  const lesson = lessons.find((l) => l.id === params.id)

  if (!lesson) {
    notFound()
  }

  return <DictationExercise lesson={lesson} />
}
