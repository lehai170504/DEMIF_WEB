import { Button } from "@/components/ui/button"
import { Heart, BookmarkPlus, Copy, Check } from "lucide-react"

interface BlogActionButtonsProps {
  isLiked: boolean
  isSaved: boolean
  copied: boolean
  likesCount: number
  onLike: () => void
  onSave: () => void
  onCopyLink: () => void
}

export function BlogActionButtons({
  isLiked,
  isSaved,
  copied,
  likesCount,
  onLike,
  onSave,
  onCopyLink,
}: BlogActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button
        variant="outline"
        className={`flex items-center gap-2 border-2 hover:scale-105 transition-all duration-300 ${
          isLiked
            ? "bg-gradient-to-r from-red-500 to-pink-500 border-red-400 text-white shadow-lg"
            : "border-gray-200 text-gray-700 hover:border-red-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:shadow-lg"
        }`}
        onClick={onLike}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
        <span>Thích ({isLiked ? likesCount + 1 : likesCount})</span>
      </Button>

      <Button
        variant="outline"
        className={`flex items-center gap-2 border-2 hover:scale-105 transition-all duration-300 ${
          isSaved
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400 text-white shadow-lg"
            : "border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:shadow-lg"
        }`}
        onClick={onSave}
      >
        <BookmarkPlus className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
        <span>{isSaved ? "Đã lưu" : "Lưu bài viết"}</span>
      </Button>

      <Button
        variant="outline"
        className={`flex items-center gap-2 border-2 transition-all duration-300 ${
          copied
            ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white shadow-lg scale-105"
            : "border-gray-200 text-gray-700 hover:border-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white hover:scale-105 hover:shadow-lg"
        }`}
        onClick={onCopyLink}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span>Đã sao chép!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Sao chép link</span>
          </>
        )}
      </Button>
    </div>
  )
}
