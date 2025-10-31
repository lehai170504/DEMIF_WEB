import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import { BlogCategory } from "@/lib/data/blog"

interface CategoryFilterProps {
  categories: BlogCategory[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-6 w-6 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">Danh mục</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            onClick={() => onCategoryChange(category.slug)}
            className={`
              relative overflow-hidden transition-all duration-300 group
              ${
                selectedCategory === category.slug
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200 scale-105"
                  : "border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-orange-200"
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {category.name}
              <Badge
                variant="secondary"
                className={`
                  transition-colors duration-300
                  ${
                    selectedCategory === category.slug
                      ? "bg-white/20 text-white border-0"
                      : "bg-gray-100 text-gray-600 group-hover:bg-white/20 group-hover:text-white group-hover:border-0"
                  }
                `}
              >
                {category.count}
              </Badge>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
