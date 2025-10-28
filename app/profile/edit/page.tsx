"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, CheckCircle, X, User, Info, Lock, Shield, Smartphone, CreditCard } from "lucide-react"
import { HeaderUser } from "@/components/layouts/User/HeaderUser"
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"
import { mockUserProfile, validateUsername } from "@/lib/data/user-profile"
import { mockUserSubscription, mockPaymentHistory, subscriptionPlans, formatCurrency, formatDate, getStatusColor, getStatusText } from "@/lib/data/subscription"
import { Badge } from "@/components/ui/badge"

export default function EditProfilePage() {
  const [profile, setProfile] = useState(mockUserProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar)
  const [usernameValidation, setUsernameValidation] = useState<{ isValid: boolean; error?: string }>({ isValid: true, error: "" })
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setAvatarPreview(result)
        setProfile({ ...profile, avatar: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUsernameChange = async (username: string) => {
    setProfile({ ...profile, username })
    
    if (username === mockUserProfile.username) {
      setUsernameValidation({ isValid: true, error: "" })
      return
    }

    setIsCheckingUsername(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const validation = validateUsername(username)
    setUsernameValidation(validation)
    setIsCheckingUsername(false)
  }

  const handleSave = async () => {
    // Validate username before saving
    if (!usernameValidation.isValid) {
      alert('Vui lòng sửa lỗi username trước khi lưu')
      return
    }

    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Cập nhật thông tin thành công!')
  }

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountInfo()
      case "password":
        return renderPasswordChange()
      case "mfa":
        return renderMFASettings()
      case "devices":
        return renderDeviceManagement()
      case "billing":
        return renderBillingAndSubscription()
      default:
        return renderAccountInfo()
    }
  }

  const renderAccountInfo = () => (
    <>
      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="h-20 w-20 border border-gray-200">
          <AvatarImage src={avatarPreview} />
          <AvatarFallback className="text-xl bg-blue-500 text-white font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          className="border-dashed border-gray-300 text-gray-600 hover:border-gray-400"
        >
          Tải ảnh mới
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Username */}
        <div>
          <Label htmlFor="username" className="text-sm font-medium text-gray-700 mb-2 block">
            Tên đăng nhập
          </Label>
          <div className="relative">
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className={`${!usernameValidation.isValid ? 'border-red-500 focus:border-red-500' : usernameValidation.isValid && profile.username !== mockUserProfile.username ? 'border-green-500 focus:border-green-500' : 'border-gray-300 focus:border-gray-500'}`}
              placeholder="Nhập tên đăng nhập"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isCheckingUsername ? (
                <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
              ) : !usernameValidation.isValid ? (
                <X className="h-4 w-4 text-red-500" />
              ) : profile.username !== mockUserProfile.username ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : null}
            </div>
          </div>
          {usernameValidation.error && (
            <p className="text-sm text-red-500 mt-1">{usernameValidation.error}</p>
          )}
        </div>

        {/* Email - Read Only */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            className="bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
            placeholder="Email của bạn"
            readOnly
          />
        </div>

        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-2 block">
            Họ và tên
          </Label>
          <Input
            id="fullName"
            defaultValue=""
            className="border-gray-300 focus:border-gray-500"
            placeholder="Nhập họ và tên"
          />
        </div>

        {/* Date of Birth and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Ngày tháng năm sinh
            </Label>
            <Input
              type="date"
              className="border-gray-300 focus:border-gray-500"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Giới tính
            </Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-gray-500">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
            Số điện thoại
          </Label>
          <Input
            id="phone"
            type="tel"
            className="border-gray-300 focus:border-gray-500"
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
            Địa chỉ
          </Label>
          <Input
            id="address"
            className="border-gray-300 focus:border-gray-500"
            placeholder="Nhập địa chỉ"
          />
        </div>

        {/* Country */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Quốc gia/Khu vực
          </Label>
          <Select value={profile.country} onValueChange={(value) => setProfile({ ...profile, country: value })}>
            <SelectTrigger className="border-gray-300 focus:border-gray-500">
              <SelectValue placeholder="Chọn quốc gia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vietnam">Việt Nam</SelectItem>
              <SelectItem value="USA">Hoa Kỳ</SelectItem>
              <SelectItem value="UK">Vương quốc Anh</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Úc</SelectItem>
              <SelectItem value="Other">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !usernameValidation.isValid}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
        >
          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </>
  )

  const renderPasswordChange = () => (
    <>
      <div className="space-y-6">
        <div>
          <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 mb-2 block">
            Mật khẩu hiện tại
          </Label>
          <Input
            id="currentPassword"
            type="password"
            className="border-gray-300 focus:border-gray-500"
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>

        <div>
          <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 mb-2 block">
            Mật khẩu mới
          </Label>
          <Input
            id="newPassword"
            type="password"
            className="border-gray-300 focus:border-gray-500"
            placeholder="Nhập mật khẩu mới"
          />
          <p className="text-sm text-gray-500 mt-1">
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
          </p>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-2 block">
            Xác nhận mật khẩu mới
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            className="border-gray-300 focus:border-gray-500"
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2">
          Cập nhật mật khẩu
        </Button>
      </div>
    </>
  )

  const renderMFASettings = () => (
    <>
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Xác thực hai yếu tố (2FA)</h3>
          <p className="text-sm text-blue-700">
            Tăng cường bảo mật tài khoản bằng cách thêm lớp xác thực thứ hai
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">TOTP Authenticator</h4>
                <p className="text-sm text-gray-500">Google Authenticator, Authy, etc.</p>
              </div>
            </div>
            <Button variant="outline">Cấu hình</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-400">SMS Authentication</h4>
                <p className="text-sm text-gray-400">Chưa khả dụng</p>
              </div>
            </div>
            <Button variant="outline" disabled>Sắp có</Button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2">
            Lưu cài đặt
          </Button>
          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
            Vô hiệu hóa 2FA
          </Button>
        </div>
      </div>
    </>
  )

  const renderDeviceManagement = () => (
    <>
      <div className="space-y-6">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-medium text-yellow-900 mb-2">Quản lý thiết bị đăng nhập</h3>
          <p className="text-sm text-yellow-700">
            Xem và quản lý các thiết bị đã đăng nhập vào tài khoản của bạn
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-green-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">MacBook Pro</h4>
                <p className="text-sm text-gray-500">Chrome • Ho Chi Minh City, Vietnam</p>
                <p className="text-xs text-green-600">Thiết bị hiện tại</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Đang hoạt động</p>
              <p className="text-xs text-gray-500">2 phút trước</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">iPhone 15</h4>
                <p className="text-sm text-gray-500">Safari • Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">Đã đăng nhập</p>
                <p className="text-xs text-gray-500">1 giờ trước</p>
              </div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                Đăng xuất
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">Windows PC</h4>
                <p className="text-sm text-gray-500">Edge • Hanoi, Vietnam</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">Đã đăng nhập</p>
                <p className="text-xs text-gray-500">2 ngày trước</p>
              </div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
          Đăng xuất khỏi tất cả thiết bị
        </Button>
      </div>
    </>
  )

  const renderBillingAndSubscription = () => (
    <>
      {/* Current Plan Section */}
      <div className="space-y-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{mockUserSubscription.currentPlan.name}</h3>
                <Badge className="bg-orange-500 text-white">
                  {mockUserSubscription.currentPlan.badge?.text || "Đang sử dụng"}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(mockUserSubscription.currentPlan.price)}
                <span className="text-base font-normal text-gray-600">
                  /{mockUserSubscription.currentPlan.billingCycle === "monthly" ? "tháng" : "năm"}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Trạng thái</p>
              <Badge className={`${getStatusColor(mockUserSubscription.status) === "green" ? "bg-green-500" : "bg-gray-500"} text-white`}>
                {getStatusText(mockUserSubscription.status)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/60 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Ngày bắt đầu</p>
              <p className="font-semibold">{formatDate(mockUserSubscription.startDate)}</p>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Ngày gia hạn tiếp theo</p>
              <p className="font-semibold">{formatDate(mockUserSubscription.nextBillingDate!)}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Tính năng của gói:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {mockUserSubscription.currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-orange-200">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoRenew"
                checked={mockUserSubscription.autoRenew}
                className="w-4 h-4 text-orange-600 rounded"
                readOnly
              />
              <label htmlFor="autoRenew" className="text-sm text-gray-700">
                Tự động gia hạn
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                Thay đổi gói
              </Button>
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                Hủy gói
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Gói khác</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptionPlans
            .filter(plan => plan.id !== mockUserSubscription.currentPlan.id)
            .slice(0, 4)
            .map((plan) => (
              <div
                key={plan.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{plan.name}</h4>
                    {plan.badge && (
                      <Badge className={`mt-1 ${
                        plan.badge.color === "blue" ? "bg-blue-500" :
                        plan.badge.color === "green" ? "bg-green-500" :
                        plan.badge.color === "purple" ? "bg-purple-500" :
                        "bg-gray-500"
                      } text-white`}>
                        {plan.badge.text}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(plan.price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      /{plan.billingCycle === "monthly" ? "tháng" : "năm"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <p className="text-xs text-gray-500 ml-5">+{plan.features.length - 3} tính năng khác</p>
                  )}
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="sm">
                  Nâng cấp
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* Payment History Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lịch sử thanh toán</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gói
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hóa đơn
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPaymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {new Date(payment.date).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {payment.plan}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge className={`${
                        getStatusColor(payment.status) === "green" ? "bg-green-100 text-green-800" :
                        getStatusColor(payment.status) === "yellow" ? "bg-yellow-100 text-yellow-800" :
                        getStatusColor(payment.status) === "red" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {getStatusText(payment.status)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {payment.invoiceUrl && (
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                          Tải xuống
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )

  const getTabTitle = () => {
    switch (activeTab) {
      case "account":
        return "Thông tin tài khoản"
      case "password":
        return "Thay đổi mật khẩu"
      case "mfa":
        return "Cấu hình MFA TOTP"
      case "devices":
        return "Quản lý thiết bị đăng nhập"
      case "billing":
        return "Thanh toán & Gói học"
      default:
        return "Thông tin tài khoản"
    }
  }

  const getTabDescription = () => {
    switch (activeTab) {
      case "account":
        return "Cập nhật đầy đủ thông tin của bạn để có được sự hỗ trợ tốt nhất đến từ DEMIF bạn nhé."
      case "password":
        return "Cập nhật mật khẩu để bảo vệ tài khoản của bạn an toàn hơn."
      return "Phân tích AI chi tiết"
      case "mfa":
        return "Thiết lập xác thực hai yếu tố để tăng cường bảo mật cho tài khoản."
      case "devices":
        return "Xem và quản lý các thiết bị đã đăng nhập vào tài khoản của bạn."
      case "billing":
        return "Quản lý gói đăng ký và xem lịch sử thanh toán của bạn."
      default:
        return "Cập nhật đầy đủ thông tin của bạn để có được sự hỗ trợ tốt nhất đến từ DEMIF bạn nhé."
    }
  }

  return (
    <>
      <HeaderUser />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              {/* Sidebar */}
              <div className="w-64 flex-shrink-0">
                <Card className="p-4">
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab("account")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === "account"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span className="font-medium">Thông tin tài khoản</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("password")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === "password"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Lock className="h-4 w-4" />
                      <span className="font-medium">Thay đổi mật khẩu</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("mfa")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === "mfa"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Cấu hình MFA TOTP</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("devices")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === "devices"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span className="font-medium">Quản lý thiết bị</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("billing")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === "billing"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="font-medium">Thanh toán & Gói học</span>
                    </button>
                  </nav>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{getTabTitle()}</h1>
                  <p className="text-gray-600">{getTabDescription()}</p>
                </div>

                <Card className="p-8">
                  {renderContent()}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </>
  )
}