"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, BookOpenText } from "lucide-react" // Thêm icon BookOpenText
import { motion } from "framer-motion"

interface VocabItem {
  word: string
  meaning: string
}

export function VocabularyPanel({ lessonVocab }: { lessonVocab: string[] }) {
  // Khởi tạo danh sách từ vựng từ props, gán nghĩa rỗng cho các từ ban đầu
  const [vocabList, setVocabList] = useState<VocabItem[]>(lessonVocab.map((word) => ({ word, meaning: "" })))
  const [newWord, setNewWord] = useState("")
  const [newMeaning, setNewMeaning] = useState("")

  const addVocab = () => {
    if (newWord.trim()) {
      // Thêm từ mới lên đầu danh sách để dễ thấy
      setVocabList([{ word: newWord.trim(), meaning: newMeaning.trim() }, ...vocabList])
      setNewWord("")
      setNewMeaning("")
    }
  }

  const removeVocab = (index: number) => {
    // Sử dụng motion.div để tạo hiệu ứng xóa mượt mà (nếu Framer Motion được dùng)
    setVocabList(vocabList.filter((_, i) => i !== index))
  }

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-xl shadow-orange-200/50 sticky top-24 border border-orange-100">
      
      {/* Tiêu đề được cải tiến */}
      <div className="flex items-center gap-2 mb-5 border-b border-orange-100 pb-3">
        <BookOpenText className="h-6 w-6 text-[#FF7A00]" />
        <h3 className="text-xl font-bold text-slate-800">Sổ Tay Từ Vựng</h3>
      </div>

      {/* Danh sách Từ vựng */}
      <div className="space-y-3 mb-6 max-h-[350px] overflow-y-auto pr-2 no-scrollbar">
        {vocabList.length === 0 ? (
          <p className="text-slate-500 text-center py-4 text-sm">Chưa có từ vựng nào trong danh sách.</p>
        ) : (
          vocabList.map((item, index) => (
            <motion.div 
              key={item.word + index} // Dùng cả index và word làm key
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-white rounded-xl border-2 border-orange-200/70 shadow-sm transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="font-bold text-lg text-slate-800 truncate">{item.word}</div>
                  {item.meaning && <div className="text-sm text-slate-600 mt-1 italic">{item.meaning}</div>}
                  {!item.meaning && <div className="text-sm text-slate-400 mt-1 italic">Chưa có nghĩa</div>}
                </div>
                
                {/* Nút Xóa */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeVocab(index)}
                  className="rounded-full h-8 w-8 text-red-500 hover:bg-red-100 transition-opacity opacity-0 group-hover:opacity-100"
                  aria-label="Xóa từ vựng"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Form thêm Từ vựng */}
      <div className="space-y-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
        <h4 className="text-base font-semibold text-slate-700">Thêm Từ Mới:</h4>
        <Input
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Từ (Ví dụ: remarkable)"
          className="border-orange-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-100 rounded-lg text-base"
        />
        <Input
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
          placeholder="Nghĩa (Tùy chọn)"
          className="border-orange-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-100 rounded-lg text-base"
        />
        <Button
          onClick={addVocab}
          disabled={!newWord.trim()}
          className="w-full bg-[#FF7A00] hover:bg-[#FF8A1C] text-white font-semibold rounded-lg shadow-lg shadow-orange-300/50 transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm vào Sổ Tay
        </Button>
      </div>
    </Card>
  )
}