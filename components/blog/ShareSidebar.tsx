"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, UserCheck } from "lucide-react";

interface ShareSidebarProps {
  title: string;
  postUrl: string;
  authorName?: string;
}

export function ShareSidebar({
  title,
  postUrl,
  authorName,
}: ShareSidebarProps) {
  const encodedUrl = encodeURIComponent(postUrl);

  return (
    <div className="space-y-6">
      {/* Tác giả Card */}
      <Card className="border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a0a] rounded-[2rem] p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
              Biên tập bởi
            </p>
            <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {authorName || "Demif_Admin"}
            </h4>
          </div>
        </div>
      </Card>
    </div>
  );
}
