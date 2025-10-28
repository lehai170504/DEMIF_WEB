// app/dictation/page.tsx
'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, BookOpen, ChevronRight, Filter } from "lucide-react";
import { lessons } from "@/lib/data/lessons";
import { HeaderUser } from "@/components/layouts/User/HeaderUser";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ColumnDef } from "@tanstack/react-table";

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

const columns: ColumnDef<(typeof lessons)[number]>[] = [
  {
    accessorKey: 'title',
    header: 'Tên bài học',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-gray-900">{row.original.title}</div>
          <div className="text-sm text-gray-500 line-clamp-1">{row.original.description}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`text-xs ${getLevelBadgeClasses(row.original.level as LessonLevel)}`}
      >
        {
          row.original.level === "beginner" ? "Sơ cấp" :
          row.original.level === "intermediate" ? "Trung cấp" :
          "Nâng cao"
        }
      </Badge>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Thời gian',
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Clock className="h-4 w-4" />
        <span>{row.original.duration} giây</span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Danh mục',
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.category}</span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
        <Link href={`/dictation/${row.original.id}`}>
          Bắt Đầu
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </Button>
    ),
  },
];

export default function DictationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-mono">
       <HeaderUser /> 

       <main className="flex-1 container mx-auto px-4 py-8"> {/* <<< ĐÃ THÊM flex-1 */}
         {/* Main Title Block - remains centered */}
         <div className="mb-10 text-center">
           <h2 className="text-4xl font-extrabold tracking-tight mb-2 text-primary">Lựa Chọn Bài Học</h2>
           <p className="text-lg text-muted-foreground">Chọn một bài tập để luyện kỹ năng nghe và viết của bạn.</p>
         </div>

         {/* Responsive Layout with Filters and Lessons */}
         <div className="space-y-6">
           {/* Filters Section */}
           <Card className="p-4">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                 <h4 className="flex items-center text-lg font-semibold mb-2 sm:mb-0 text-primary">
                   <Filter className="h-5 w-5 mr-2" />
                   Bộ Lọc
                 </h4>
                 <p className="text-sm text-muted-foreground">Lọc bài học theo cấp độ</p>
               </div>
               <div className="flex flex-wrap gap-2">
                 {['Tất cả', 'Sơ cấp', 'Trung cấp', 'Nâng cao'].map((level) => (
                   <Button
                     key={level}
                     variant="ghost"
                     size="sm"
                     className={`transition-colors duration-200 ${level === 'Tất cả' ? 'bg-primary/10 text-primary font-semibold hover:bg-primary/20' : 'hover:bg-accent'}`}
                   >
                     {level}
                   </Button>
                 ))}
               </div>
             </div>
           </Card>

           {/* Stats Card */}
           <Card className="p-4">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                 <h4 className="text-lg font-semibold mb-2">Thống Kê Cá Nhân</h4>
                 <p className="text-sm text-muted-foreground">
                   Bạn đã hoàn thành <span className="font-semibold text-primary">5/12</span> bài tập.
                 </p>
               </div>
               <div className="flex items-center gap-4">
                 <div className="flex-1 min-w-[200px]">
                   <div className="flex items-center justify-between text-sm mb-1">
                     <span>Tiến độ</span>
                     <span className="font-semibold">41.7%</span>
                   </div>
                   <div className="h-2 w-full rounded-full bg-gray-200">
                     <div className="h-2 rounded-full bg-primary" style={{ width: '41.7%' }}></div>
                   </div>
                 </div>
                 <Button variant="link" className="p-0 h-auto text-sm whitespace-nowrap" asChild>
                   <Link href="/dashboard">Xem Chi Tiết</Link>
                 </Button>
               </div>
             </div>
           </Card>

           {/* Lessons Table */}
           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
             <div className="overflow-x-auto">
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead className="min-w-[300px]">Tên bài học</TableHead>
                     <TableHead className="min-w-[100px]">Cấp độ</TableHead>
                     <TableHead className="min-w-[120px]">Thời gian</TableHead>
                     <TableHead className="min-w-[120px]">Danh mục</TableHead>
                     <TableHead className="min-w-[120px] text-right">Hành động</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {lessons.map((lesson) => (
                     <TableRow key={lesson.id} className="hover:bg-orange-50/50">
                       <TableCell>
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                             <BookOpen className="h-5 w-5 text-white" />
                           </div>
                           <div className="min-w-0">
                             <div className="font-semibold text-gray-900 truncate">{lesson.title}</div>
                             <div className="text-sm text-gray-500 line-clamp-2">{lesson.description}</div>
                           </div>
                         </div>
                       </TableCell>
                       <TableCell>
                         <Badge
                           variant="outline"
                           className={`text-xs ${getLevelBadgeClasses(lesson.level as LessonLevel)}`}
                         >
                           {
                             lesson.level === "beginner" ? "Sơ cấp" :
                             lesson.level === "intermediate" ? "Trung cấp" :
                             "Nâng cao"
                           }
                         </Badge>
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-1 text-sm text-gray-600">
                           <Clock className="h-4 w-4 flex-shrink-0" />
                           <span>{lesson.duration} giây</span>
                         </div>
                       </TableCell>
                       <TableCell>
                         <span className="text-sm text-gray-600">{lesson.category}</span>
                       </TableCell>
                       <TableCell className="text-right">
                         <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                           <Link href={`/dictation/${lesson.id}`}>
                             Bắt Đầu
                             <ChevronRight className="h-4 w-4 ml-1" />
                           </Link>
                         </Button>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </div>
           </div>
         </div>
       </main>
       <FooterLanding />
    </div>
  )
}