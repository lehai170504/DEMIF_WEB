import { ShadowingExercise } from "@/components/shadowing/shadowing-exercise"
import { lessons } from "@/lib/data/lessons"
import { notFound } from "next/navigation"

export default function ShadowingExercisePage({ params }: { params: { id: string } }) {
  const lesson = lessons.find((l) => l.id === params.id)

  if (!lesson) {
    notFound()
  }

  return <ShadowingExercise lesson={lesson} />
}
