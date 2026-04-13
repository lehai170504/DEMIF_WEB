"use client";

import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useMySubscription } from "@/hooks/use-subscription";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

function getInitials(name: string): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(-2)
    .join("");
}

export function UserProfileCard() {
  const { user } = useAuth();
  const { data: mySubscription } = useMySubscription();
  const router = useRouter();

  const initials = getInitials(user?.username ?? "User");

  const isPremium =
    mySubscription?.status === "Active" &&
    mySubscription?.tier &&
    mySubscription.tier !== "Free";
  const tierLabel = isPremium ? `Pro Member` : "Học viên";

  const joinDate = user?.createdAt
    ? format(new Date(user.createdAt), "MM/yyyy", { locale: vi })
    : "—";

  const location = user?.country ? user.country : "Vietnam";

  return (
    <div className="p-6 md:p-8 flex flex-col h-full items-center text-center relative z-10 font-mono">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[50px] rounded-full -mr-10 -mt-10 pointer-events-none" />

      {/* ── AVATAR SECTION ── */}
      <div className="relative mb-6 group cursor-pointer">
        {/* Vòng sáng quanh avatar khi là Premium */}
        {isPremium && (
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500" />
        )}

        <div className="relative w-24 h-24 rounded-full p-1 bg-white dark:bg-[#111113] border-2 border-gray-100 dark:border-white/5 shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center relative overflow-hidden">
              <span className="text-2xl font-black text-gray-400 dark:text-zinc-500 z-10 tracking-widest">
                {initials}
              </span>
            </div>
          )}

          {/* Badge cấp độ đính kèm Avatar */}
          <Badge
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest border-2 border-white dark:border-[#111113] shadow-md whitespace-nowrap ${
              isPremium
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : "bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300"
            }`}
          >
            {tierLabel}
          </Badge>
        </div>
      </div>

      {/* ── USER INFO ── */}
      <div className="mb-8 w-full">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tighter truncate px-2">
          {user?.username ?? "Người dùng"}
        </h2>
        <p className="text-[11px] font-bold text-gray-500 dark:text-zinc-500 tracking-widest mt-1 truncate px-2">
          {user?.email ?? "chua-cap-nhat@email.com"}
        </p>
      </div>

      {/* ── INFO BLOCKS ── */}
      <div className="w-full space-y-3 mb-8">
        {/* Location */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 group hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors">
          <div className="p-2 rounded-xl bg-white dark:bg-[#18181b] border border-gray-100 dark:border-white/5 shadow-sm group-hover:border-orange-500/30 transition-colors">
            <MapPin className="h-4 w-4 text-gray-400 dark:text-zinc-500 group-hover:text-orange-500 transition-colors" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
              Khu vực
            </span>
            <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
              {location}
            </span>
          </div>
        </div>

        {/* Join Date */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 group hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors">
          <div className="p-2 rounded-xl bg-white dark:bg-[#18181b] border border-gray-100 dark:border-white/5 shadow-sm group-hover:border-orange-500/30 transition-colors">
            <CalendarDays className="h-4 w-4 text-gray-400 dark:text-zinc-500 group-hover:text-orange-500 transition-colors" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
              Thành viên từ
            </span>
            <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
              {joinDate}
            </span>
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTON ── */}
      <div className="w-full mt-auto pt-2 border-t border-gray-100 dark:border-white/5">
        <Button
          onClick={() => router.push("/profile/edit")}
          variant="ghost"
          className="w-full h-12 rounded-2xl bg-transparent hover:bg-orange-500/10 text-gray-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
        >
          <UserCog className="h-4 w-4 mr-2" /> Hồ sơ cá nhân
        </Button>
      </div>
    </div>
  );
}
