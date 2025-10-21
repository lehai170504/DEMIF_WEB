"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Save, Loader2, Check } from "lucide-react" 
import { motion } from "framer-motion"

export function NotesPanel() {
  const [notes, setNotes] = useState("")
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false) 

  const handleSave = () => {
    if (isSaving || notes.trim() === "") return

    setIsSaving(true)
    
    setTimeout(() => {
      localStorage.setItem("dictation-notes", notes)
      setIsSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 800)
  }
  const buttonContent = saved ? (
    <>
      <Check className="h-4 w-4 mr-1" />
      Đã lưu!
    </>
  ) : isSaving ? (
    <>
      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
      Đang lưu...
    </>
  ) : (
    <>
      <Save className="h-4 w-4 mr-1" />
      Lưu
    </>
  )

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-xl shadow-orange-200/50 sticky top-24 transform transition-shadow duration-300 hover:shadow-orange-300/60">
      <div className="mb-5 border-b border-orange-100 pb-3">
        <h3 className="text-xl font-bold text-[#FF7A00] flex items-center gap-2">
          <Save className="h-5 w-5" />
          Ghi chú của tôi
        </h3>
      </div>

      <Textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value)
          setSaved(false) 
        }}
        placeholder="Viết ghi chú của bạn tại đây..."
        className="min-h-[250px] border-orange-300/60 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl p-4 text-slate-700 transition-all duration-300"
      />

      <motion.div 
        layout 
        className="mt-4 flex justify-between items-center"
      >
        <div className="text-xs text-slate-500">
          Ghi chú được lưu tự động trên thiết bị của bạn
        </div>
        <Button 
          size="sm" 
          onClick={handleSave} 
          disabled={isSaving || notes.trim() === ""} 
          className={`
            font-semibold 
            rounded-full 
            px-4 py-2 
            transition-all duration-300
            ${isSaving 
              ? "bg-slate-400 cursor-not-allowed" 
              : saved 
                ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200/50" 
                : "bg-[#FF7A00] hover:bg-[#FF8A1C] shadow-lg shadow-orange-300/50"
            }
          `}
        >
          {buttonContent}
        </Button>
      </motion.div>
    </Card>
  )
}