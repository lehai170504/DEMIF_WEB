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
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Chi tiết đơn hàng #{order.id}</SheetTitle>
          <SheetDescription>
            Thông tin chi tiết và lịch sử của đơn hàng
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Trạng thái</span>
            {getStatusBadge(order.status)}
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="space-y-3">
            <h4 className="font-medium">Thông tin khách hàng</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tên:</span>
                <span>{order.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{order.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID khách hàng:</span>
                <span>{order.userId}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Info */}
          <div className="space-y-3">
            <h4 className="font-medium">Thông tin gói</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gói:</span>
                <span>{order.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loại:</span>
                <Badge variant="outline" className="capitalize">
                  {order.packageType}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Giá trị:</span>
                <span className="font-medium">{formatCurrency(order.amount)}</span>
              </div>
              {order.expiresAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hết hạn:</span>
                  <span>{formatDateTime(order.expiresAt)}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-3">
            <h4 className="font-medium">Thông tin thanh toán</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phương thức:</span>
                <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
              </div>
              {order.transactionId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mã giao dịch:</span>
                  <span className="font-mono text-xs">{order.transactionId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày tạo:</span>
                <span>{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cập nhật:</span>
                <span>{formatDateTime(order.updatedAt)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-medium">Tính năng gói</h4>
            <div className="space-y-2">
              {order.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-medium">Lịch sử đơn hàng</h4>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" className="flex-1">
              Xuất hóa đơn
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Gửi email
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default OrderDetailDrawer