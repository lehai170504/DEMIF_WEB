import { IconTrendingDown, IconTrendingUp, IconHeadphones, IconUsers, IconTarget, IconRobot } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng Số Bài Luyện Tập</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            250
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconHeadphones className="size-4 mr-1" />
              +5 Bài/Tuần
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Nội dung mới được thêm đều đặn
          </div>
          <div className="text-muted-foreground">
            Bao gồm cả Dictation và Shadowing
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng Số Người Dùng</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12,500
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              <IconTrendingUp className="size-4 mr-1" />
              +15%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tăng trưởng ổn định tháng này <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Người dùng mới đăng ký thành công
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tỷ Lệ Chính Xác TB</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            85.6%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
              <IconTrendingDown className="size-4 mr-1" />
              -1.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cần kiểm tra cấp độ bài tập <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Điểm số Dictation trung bình của User
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Số Lượt Phản Hồi AI (24h)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4,890
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconRobot className="size-4 mr-1" />
              100% Xử lý
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tất cả yêu cầu AI đã được xử lý
          </div>
          <div className="text-muted-foreground">Phản hồi tức thì cho Shadowing</div>
        </CardFooter>
      </Card>
    </div>
  )
}