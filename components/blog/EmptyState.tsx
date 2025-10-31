import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onReset: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <Card className="p-16 text-center bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300">
      <div className="text-6xl mb-4 opacity-20">🔍</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
      <p className="text-gray-600 mb-6">
        Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
      </p>
      <Button onClick={onReset} className="bg-orange-500 hover:bg-orange-600">
        Xem tất cả bài viết
      </Button>
    </Card>
  )
}
