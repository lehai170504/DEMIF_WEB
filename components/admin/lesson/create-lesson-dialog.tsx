"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BookPlus, Youtube, Mic } from "lucide-react"; 

import { YoutubeAutoTab } from "./youtube-auto-tab";
import { QuickCreateTab } from "./quick-create-tab";
import { LessonWorkflowGuide } from "./lesson-workflow-guide";

interface CreateLessonDialogProps {
  children?: React.ReactNode;
}

export default function CreateLessonDialog({
  children,
}: CreateLessonDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleSuccess = (id?: string) => {
    setOpen(false);
    if (id) router.push(`/admin/lessons/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="h-11 gap-2 bg-[#FF7A00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95">
            <Plus className="h-4 w-4" /> Khởi tạo Bài Học
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1100px] bg-white dark:bg-zinc-950 border-none p-0 rounded-[2.5rem] shadow-2xl font-mono flex flex-col max-h-[95vh] overflow-hidden [&>button]:z-50 [&>button]:right-6 [&>button]:top-6 [&>button]:p-2 [&>button]:bg-slate-100 dark:[&>button]:bg-zinc-800 [&>button]:rounded-full hover:[&>button]:bg-slate-200 dark:hover:[&>button]:bg-zinc-700 transition-all">
        {/* HEADER DÍNH */}
        <DialogHeader className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/50 z-20 backdrop-blur-md shrink-0">
          <DialogTitle className="flex items-center gap-3 text-2xl font-mono font-bold uppercase tracking-tighter text-slate-900 dark:text-white">
            <div className="p-2 bg-orange-100 dark:bg-orange-500/10 rounded-xl">
              <BookPlus className="h-6 w-6 text-[#FF7A00]" />
            </div>
            Khởi tạo <span className="text-slate-400">Nội dung (Draft)</span>
          </DialogTitle>
        </DialogHeader>

        {/* CONTAINER CHÍNH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto no-scrollbar">
          {/* CỘT TRÁI: KHU VỰC FORM (8 PHẦN) */}
          <div className="lg:col-span-8 p-8 border-r border-slate-100 dark:border-white/5">
            {/* Đặt defaultValue là youtube */}
            <Tabs defaultValue="youtube" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-8 bg-slate-100 dark:bg-zinc-900 p-1.5 rounded-2xl h-14">
                <TabsTrigger
                  value="youtube"
                  className="rounded-xl font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-red-500 transition-all"
                >
                  <Youtube className="w-3.5 h-3.5 mr-2 text-red-500" /> YouTube
                  Auto
                </TabsTrigger>
                <TabsTrigger
                  value="audio"
                  className="rounded-xl font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-[#FF7A00] transition-all"
                >
                  <Mic className="w-3.5 h-3.5 mr-2" /> Upload Audio
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="youtube"
                className="mt-0 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <YoutubeAutoTab onSuccess={handleSuccess} />
              </TabsContent>

              <TabsContent
                value="audio"
                className="mt-0 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <QuickCreateTab onSuccess={handleSuccess} />
              </TabsContent>
            </Tabs>
          </div>
          <LessonWorkflowGuide />
        </div>
      </DialogContent>
    </Dialog>
  );
}