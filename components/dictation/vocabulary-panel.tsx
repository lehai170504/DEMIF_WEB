"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface VocabItem {
  word: string
  meaning: string
}

export function VocabularyPanel({ lessonVocab }: { lessonVocab: string[] }) {
  const [vocabList, setVocabList] = useState<VocabItem[]>(lessonVocab.map((word) => ({ word, meaning: "" })))
  const [newWord, setNewWord] = useState("")
  const [newMeaning, setNewMeaning] = useState("")

  const addVocab = () => {
    if (newWord.trim()) {
      setVocabList([...vocabList, { word: newWord, meaning: newMeaning }])
      setNewWord("")
      setNewMeaning("")
    }
  }

  const removeVocab = (index: number) => {
    setVocabList(vocabList.filter((_, i) => i !== index))
  }

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg shadow-orange-100/40 sticky top-24">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Vocabulary Builder</h3>

      <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
        {vocabList.map((item, index) => (
          <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200 group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-semibold text-slate-800">{item.word}</div>
                {item.meaning && <div className="text-sm text-slate-600 mt-1">{item.meaning}</div>}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeVocab(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Input
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="New word..."
          className="border-orange-200 focus:border-orange-400 focus:ring-orange-100 rounded-lg"
        />
        <Input
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
          placeholder="Meaning (optional)..."
          className="border-orange-200 focus:border-orange-400 focus:ring-orange-100 rounded-lg"
        />
        <Button
          onClick={addVocab}
          disabled={!newWord.trim()}
          className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Review
        </Button>
      </div>
    </Card>
  )
}
