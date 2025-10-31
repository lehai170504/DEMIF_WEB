import { blogCategories } from "@/lib/data/blog"

interface ResultsInfoProps {
  totalResults: number
  searchQuery: string
  selectedCategory: string
}

export function ResultsInfo({ totalResults, searchQuery, selectedCategory }: ResultsInfoProps) {
  if (!searchQuery && selectedCategory === "all") return null

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
      <p className="text-sm text-blue-800">
        <span className="font-semibold">Tìm thấy {totalResults} bài viết</span>
        {searchQuery && (
          <span>
            {" "}
            cho từ khóa "<strong>{searchQuery}</strong>"
          </span>
        )}
        {selectedCategory !== "all" && (
          <span>
            {" "}
            trong danh mục{" "}
            <strong>{blogCategories.find((c) => c.slug === selectedCategory)?.name}</strong>
          </span>
        )}
      </p>
    </div>
  )
}
