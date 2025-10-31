import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  startIndex: number
  endIndex: number
  totalPosts: number
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalPosts,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Trước
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="lg"
              onClick={() => onPageChange(page)}
              className={`
                min-w-[48px] transition-all duration-300
                ${
                  currentPage === page
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg border-0"
                    : "border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-lg hover:scale-105"
                }
              `}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
        >
          Sau
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>

      <p className="text-sm text-gray-600">
        Trang <span className="font-semibold text-orange-600">{currentPage}</span> /{" "}
        <span className="font-semibold">{totalPages}</span> • Hiển thị{" "}
        <span className="font-semibold">
          {startIndex + 1}-{Math.min(endIndex, totalPosts)}
        </span>{" "}
        trong <span className="font-semibold">{totalPosts}</span> bài viết
      </p>
    </div>
  )
}
