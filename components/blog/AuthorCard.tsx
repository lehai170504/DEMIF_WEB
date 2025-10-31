import { Separator } from "@/components/ui/separator"

interface AuthorCardProps {
  author: {
    name: string
    role: string
    bio: string
  }
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <>
      <Separator className="my-8" />
      <div className="p-6 md:p-8 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-semibold text-3xl flex-shrink-0 shadow-xl">
            {author.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{author.name}</h3>
            <p className="text-sm text-orange-600 font-medium mb-3">{author.role}</p>
            <p className="text-gray-700 leading-relaxed">{author.bio}</p>
          </div>
        </div>
      </div>
    </>
  )
}
