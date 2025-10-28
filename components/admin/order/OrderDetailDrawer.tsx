import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Clock, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { type Order, getOrderTimelineById } from '@/lib/data/orders'

interface OrderDetailDrawerProps {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
    case 'payment_completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'pending':
    case 'created':
    case 'payment_processing':
      return <Clock className="h-4 w-4 text-yellow-600" />
    case 'failed':
    case 'payment_failed':
      return <XCircle className="h-4 w-4 text-red-600" />
    case 'cancelled':
      return <AlertCircle className="h-4 w-4 text-gray-600" />
    case 'refunded':
    case 'refund_requested':
      return <RefreshCw className="h-4 w-4 text-blue-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

const getStatusBadge = (status: Order['status']) => {
  const config = {
    completed: { label: 'Thành công', variant: 'default' as const },
    pending: { label: 'Chờ xử lý', variant: 'secondary' as const },
    failed: { label: 'Thất bại', variant: 'destructive' as const },
    cancelled: { label: 'Đã hủy', variant: 'outline' as const },
    refunded: { label: 'Hoàn tiền', variant: 'secondary' as const },
  }
  
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

const getPaymentMethodLabel = (method: string) => {
  const methods = {
    credit_card: 'Thẻ tín dụng',
    paypal: 'PayPal', 
    bank_transfer: 'Chuyển khoản',
    momo: 'MoMo',
    zalopay: 'ZaloPay'
  }
  return methods[method as keyof typeof methods] || method
}

export function OrderDetailDrawer({ order, open, onOpenChange }: OrderDetailDrawerProps) {
  if (!order) return null

  const timeline = getOrderTimelineById(order.id)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-6">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-lg">Chi tiết đơn hàng #{order.id}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Thông tin chi tiết và lịch sử của đơn hàng
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Trạng thái</span>
            {getStatusBadge(order.status)}
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Thông tin khách hàng</h4>
            <div className="space-y-3 pl-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[100px]">Tên:</span>
                <span className="font-medium">{order.userName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[100px]">Email:</span>
                <span className="text-sm">{order.userEmail}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[100px]">ID khách hàng:</span>
                <span className="text-xs font-mono">{order.userId}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Thông tin gói</h4>
            <div className="space-y-3 pl-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[100px]">Gói:</span>
                <span className="font-medium text-right">{order.packageName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[100px]">Loại:</span>
                <Badge variant="outline" className="capitalize">
                  {order.packageType}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[100px]">Giá trị:</span>
                <span className="font-bold text-lg text-primary">{formatCurrency(order.amount)}</span>
              </div>
              {order.expiresAt && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground min-w-[100px]">Hết hạn:</span>
                  <span className="text-sm text-right">{formatDateTime(order.expiresAt)}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Thông tin thanh toán</h4>
            <div className="space-y-3 pl-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[120px]">Phương thức:</span>
                <span className="font-medium">{getPaymentMethodLabel(order.paymentMethod)}</span>
              </div>
              {order.transactionId && (
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground min-w-[120px]">Mã giao dịch:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-right">
                    {order.transactionId}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[120px]">Ngày tạo:</span>
                <span className="text-sm text-right">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground min-w-[120px]">Cập nhật:</span>
                <span className="text-sm text-right">{formatDateTime(order.updatedAt)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Tính năng gói</h4>
            <div className="space-y-3 pl-4">
              {order.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Lịch sử đơn hàng</h4>
            <div className="space-y-4 pl-4">
              {timeline.map((event, index) => (
                <div key={event.id} className="flex items-start gap-4 relative">
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-2 top-8 w-px h-6 bg-border" />
                  )}
                  <div className="mt-0.5 flex-shrink-0">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1 space-y-1 pb-2">
                    <p className="text-sm font-medium leading-relaxed">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <Button variant="outline" className="flex-1">
              Xuất hóa đơn
            </Button>
            <Button variant="outline" className="flex-1">
              Gửi email
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default OrderDetailDrawer