"use client";
import { CreditCard, CheckCircle2, Zap, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Current Plan */}
        <Card className="border-border shadow-xl bg-gradient-to-br from-zinc-900 to-black text-white rounded-[2rem] relative overflow-hidden">
          {/* Hiệu ứng nền */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          <CardContent className="pt-8 space-y-8 relative z-10">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/40">
                <Zap className="text-white fill-white" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30">
                ACTIVE
              </Badge>
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight">
                Admin Pro Plus
              </h3>
              <p className="text-zinc-400 font-medium mt-1">$29.00 / tháng</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
                Tính năng
              </p>
              <ul className="text-sm text-zinc-300 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Full API
                  Access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Priority
                  Support
                </li>
              </ul>
            </div>
            <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold rounded-xl h-12">
              Nâng cấp ngay
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: Payment Method */}
        <Card className="border-border shadow-xl bg-card rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-lg font-black text-foreground uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Phương thức thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  {/* Logo Visa giả lập màu */}
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] font-black text-white italic">
                    VISA
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-foreground">
                    •••• 4242
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Hết hạn 12/28
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-primary/50 text-primary bg-primary/5"
              >
                Mặc định
              </Badge>
            </div>
            <Button
              variant="outline"
              className="w-full border-dashed border-border rounded-2xl text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 h-12 font-bold transition-all"
            >
              <Plus className="w-4 h-4 mr-2" /> Thêm thẻ mới
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
