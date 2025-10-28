import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { mockRevenueData } from '@/lib/data/orders'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    month: 'short',
    day: 'numeric'
  })
}

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Doanh thu theo gói</CardTitle>
        <CardDescription>
          Biểu đồ doanh thu 7 ngày gần nhất theo từng loại gói
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={mockRevenueData.slice(-7)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
            />
            <YAxis 
              tickFormatter={(value) => `${value / 1000000}M`}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              labelFormatter={(date) => `Ngày: ${formatDate(date)}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="premium" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Gói Premium"
            />
            <Line 
              type="monotone" 
              dataKey="pro" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Gói Pro"
            />
            <Line 
              type="monotone" 
              dataKey="basic" 
              stroke="#ffc658" 
              strokeWidth={2}
              name="Gói Basic"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default RevenueChart