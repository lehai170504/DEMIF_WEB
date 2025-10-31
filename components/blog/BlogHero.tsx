import { Input } from "@/components/ui/input"
import { Search, Sparkles } from "lucide-react"

interface BlogHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 border-b border-orange-200">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-orange-200 mb-6">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Khám phá kiến thức mới</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Blog DEMIF
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Khám phá các mẹo học tập, kiến thức ngữ pháp và xu hướng học tiếng Anh mới nhất từ các chuyên gia
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết theo tiêu đề, nội dung hoặc thẻ..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-14 pr-6 py-7 text-base border-2 border-gray-200 rounded-2xl shadow-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
