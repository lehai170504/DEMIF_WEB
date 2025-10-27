"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FeedbackDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  feedback: {
    id: string;
    userName: string;
    content: string;
    aiResponse: string;
    createdAt: string;
    status: string;
  } | null;
  onReply?: () => void;
  onResendTraining?: () => void;
}

export function FeedbackDetailDrawer({
  open,
  onClose,
  feedback,
  onReply,
  onResendTraining,
}: FeedbackDetailDrawerProps) {
  if (!feedback) return null;

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-6 max-w-2xl mx-auto font-mono">
        <DrawerHeader>
          <DrawerTitle>Chi tiết phản hồi</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Người gửi</p>
              <p className="font-medium">{feedback.userName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nội dung</p>
              <p>{feedback.content}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phản hồi từ AI</p>
              <p className="text-muted-foreground">{feedback.aiResponse}</p>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant={feedback.status === "processed" ? "default" : "secondary"}>
                {feedback.status}
              </Badge>
              <span className="text-xs text-muted-foreground">{feedback.createdAt}</span>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onReply}>
            Trả lời user
          </Button>
          <Button variant="default" onClick={onResendTraining}>
            Gửi lại training AI
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
