"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Save } from "lucide-react"

export function NotesPanel() {
  const [notes, setNotes] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save to localStorage or backend
    localStorage.setItem("dictation-notes", notes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg shadow-orange-100/40 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">My Notes</h3>
        <Button size="sm" onClick={handleSave} className="bg-[#FF7A00] hover:bg-[#FF9E2C] text-white rounded-lg">
          <Save className="h-4 w-4 mr-1" />
          {saved ? "Saved!" : "Save"}
        </Button>
      </div>

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="min-h-[200px] border-orange-200 focus:border-orange-400 focus:ring-orange-100 rounded-xl mb-4"
      />

      <div className="text-xs text-slate-500">Notes are saved automatically to your device</div>
    </Card>
  )
}
