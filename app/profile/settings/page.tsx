"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save } from "lucide-react"
import { mockUserProfile } from "@/lib/data/user-profile"

export default function SettingsPage() {
  const [profile, setProfile] = useState(mockUserProfile)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Đã lưu thành công!')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Hồ sơ
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Cài đặt</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Account Settings */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin tài khoản</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Email dùng để đăng nhập và nhận thông báo
                </p>
              </div>
            </div>
          </Card>

          {/* Info Note */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <div className="text-muted-foreground">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Lưu ý:</p>
                <p>Để chỉnh sửa thông tin cá nhân như tên, ảnh đại diện, vui lòng truy cập trang <Link href="/profile/edit" className="text-primary hover:underline">Chỉnh sửa hồ sơ</Link>.</p>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Thông báo</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Thông báo qua Email</div>
                  <div className="text-sm text-muted-foreground">Nhận cập nhật qua email</div>
                </div>
                <Switch
                  checked={profile.notifications.email}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, email: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Thông báo đẩy</div>
                  <div className="text-sm text-muted-foreground">Nhận thông báo đẩy trên thiết bị</div>
                </div>
                <Switch
                  checked={profile.notifications.push}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, push: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Nhắc nhở hàng ngày</div>
                  <div className="text-sm text-muted-foreground">Nhận nhắc nhở luyện tập hàng ngày</div>
                </div>
                <Switch
                  checked={profile.notifications.dailyReminder}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, dailyReminder: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Báo cáo hàng tuần</div>
                  <div className="text-sm text-muted-foreground">Nhận báo cáo tiến độ hàng tuần</div>
                </div>
                <Switch
                  checked={profile.notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, weeklyReport: checked },
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quyền riêng tư</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Hiển thị hồ sơ</div>
                  <div className="text-sm text-muted-foreground">Cho phép người khác xem hồ sơ của bạn</div>
                </div>
                <Switch
                  checked={profile.privacy.showProfile}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacy: { ...profile.privacy, showProfile: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Hiển thị tiến độ</div>
                  <div className="text-sm text-muted-foreground">Hiển thị tiến độ học tập của bạn công khai</div>
                </div>
                <Switch
                  checked={profile.privacy.showProgress}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacy: { ...profile.privacy, showProgress: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Hiển thị trên bảng xếp hạng</div>
                  <div className="text-sm text-muted-foreground">Xuất hiện trong bảng xếp hạng toàn cầu</div>
                </div>
                <Switch
                  checked={profile.privacy.showOnLeaderboard}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacy: { ...profile.privacy, showOnLeaderboard: checked },
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive/50">
            <h2 className="text-2xl font-bold mb-6 text-destructive">Vùng nguy hiểm</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Xóa tài khoản</div>
                  <div className="text-sm text-muted-foreground">Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu của bạn</div>
                </div>
                <Button variant="destructive" size="sm">
                  Xóa tài khoản
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
