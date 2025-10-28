import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, BookOpen, ChevronRight, Filter } from "lucide-react" // Added Filter icon
import { lessons } from "@/lib/data/lessons"
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"

export default function DictationPage() {
  type LessonLevel = "beginner" | "intermediate" | "advanced";

  const getLevelBadgeClasses = (level: LessonLevel): string => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-600";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-600";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background font-mono">
      <header className="border-b border-border shadow-sm sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay Lại
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Bài Tập Chính Tả</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Bảng Điều Khiển</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Main Title Block - remains centered */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2 text-primary">Lựa Chọn Bài Học</h2>
          <p className="text-lg text-muted-foreground">Chọn một bài tập để luyện kỹ năng nghe và viết của bạn.</p>
        </div>

        {/* 3-Column Layout: Left (Filter), Center (Lessons), Right (Ads/Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. Left Sidebar (Filters/Tags) - 3/12 width on large screens */}
          <aside className="lg:col-span-3">
            <Card className="p-4 sticky top-[6.5rem]"> {/* Adjusted top for sticky header */}
              <h4 className="flex items-center text-lg font-semibold mb-4 text-primary">
                <Filter className="h-5 w-5 mr-2" />
                Bộ Lọc
              </h4>
              <p className="text-sm text-muted-foreground mb-4">Lọc bài học theo cấp độ:</p>
              
              <div className="flex flex-col gap-2">
                {['Tất cả', 'Sơ cấp', 'Trung cấp', 'Nâng cao'].map((level) => (
                  <Button
                    key={level}
                    variant="ghost"
                    size="sm"
                    className={`
                      w-full justify-start transition-colors duration-200 
                      ${level === 'Tất cả' ? 'bg-primary/10 text-primary font-semibold hover:bg-primary/20' : 'hover:bg-accent'}
                    `}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </Card>
          </aside>

          {/* 2. Main Content (Lessons List) - 6/12 width on large screens */}
          <div className="lg:col-span-6">
            <h3 className="text-2xl font-bold mb-6">Tất Cả Bài Tập</h3>
            <div className="grid gap-6">
              {lessons.map((lesson) => (
                <Card 
                  key={lesson.id} 
                  className="p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/70"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold truncate">{lesson.title}</h3>
                        <Badge
                          variant="outline"
                          className={`text-xs uppercase font-medium ${getLevelBadgeClasses(lesson.level as LessonLevel)}`}
                        >
                          {
                            lesson.level === "beginner" ? "Sơ cấp" :
                            lesson.level === "intermediate" ? "Trung cấp" :
                            "Nâng cao"
                          }
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{lesson.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{lesson.duration} giây</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{lesson.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button asChild size="lg" className="shrink-0 w-full md:w-auto">
                      <Link href={`/dictation/${lesson.id}`}>
                        Bắt Đầu
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 3. Right Sidebar (Extra Content/Ads/Progress) - 3/12 width on large screens */}
          <aside className="lg:col-span-3">
            <div className="space-y-6 sticky top-[6.5rem]"> {/* Adjusted top for sticky header */}
              <Card className="p-4">
                <h4 className="text-lg font-semibold mb-3">Thống Kê Cá Nhân</h4>
                <p className="text-sm text-muted-foreground">
                  Bạn đã hoàn thành **5/12** bài tập.
                </p>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-2 rounded-full bg-primary" style={{ width: '41.66%' }}></div>
                </div>
                <Button variant="link" className="p-0 mt-2 h-auto text-sm" asChild>
                  <Link href="/dashboard">Xem Chi Tiết</Link>
                </Button>
              </Card>

              <Card className="p-4 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-700">
                <h4 className="text-lg font-semibold mb-3 text-yellow-700 dark:text-yellow-300">Mẹo Luyện Tập</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-400">
                  Hãy thử làm bài tập **Sơ cấp** trước khi chuyển sang các cấp độ khó hơn để xây dựng nền tảng vững chắc.
                </p>
              </Card>
            </div>
          </aside>

        </div>
      </main>
      <FooterLanding />
    </div>
  )
}