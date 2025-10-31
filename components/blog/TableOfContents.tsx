import { Card } from "@/components/ui/card"
import { List } from "lucide-react"

interface TableOfContentsProps {
  sections: Array<{ id: string; title: string }>
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  if (sections.length === 0) return null

  return (
    <Card className="sticky top-24 border-2 border-orange-100 overflow-hidden shadow-lg">
      <div className="p-5 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
            <List className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-gray-900">Mục lục</h3>
        </div>
        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm text-gray-700 hover:text-orange-600 transition-colors flex items-start gap-2 group"
              >
                <span className="text-orange-400 group-hover:text-orange-600 font-bold mt-0.5">•</span>
                <span className="group-hover:translate-x-1 transition-transform leading-relaxed">
                  {section.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
