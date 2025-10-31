import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export function CommentsSection() {
  return (
    <Card className="p-8 mt-8 border-2 border-gray-100 shadow-xl bg-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <MessageCircle className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Bình luận</h3>
      </div>
      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
        <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 font-medium">Chức năng bình luận đang được phát triển.</p>
        <p className="text-gray-400 text-sm mt-2">Sẽ sớm ra mắt trong thời gian tới!</p>
      </div>
    </Card>
  )
}
