"use client";
import { CreditCard, CheckCircle2, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl bg-slate-900 text-white rounded-[2rem]">
          <CardContent className="pt-8 space-y-6">
            <div className="flex justify-between">
              <div className="p-3 bg-orange-500 rounded-2xl">
                <Zap />
              </div>
              <Badge className="bg-emerald-500">ACTIVE</Badge>
            </div>
            <div>
              <h3 className="text-2xl font-black">Admin Pro Plus</h3>
              <p className="text-slate-400">$29.00 / tháng</p>
            </div>
            <Button className="w-full bg-white text-black hover:bg-orange-50">
              Nâng cấp ngay
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white rounded-[2rem] border border-slate-100">
          <CardHeader>
            <CardTitle className="text-lg font-black">
              Phương thức thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <CreditCard className="text-blue-600" />
                </div>
                <span className="font-bold text-sm">•••• 4242</span>
              </div>
              <Badge variant="outline">Mặc định</Badge>
            </div>
            <Button
              variant="outline"
              className="w-full border-dashed rounded-2xl text-slate-500"
            >
              + Thêm thẻ mới
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
