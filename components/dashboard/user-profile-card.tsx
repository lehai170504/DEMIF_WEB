"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Edit2 } from "lucide-react";
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
  // Only show premium badge if user has an ACTIVE non-free subscription
  const isPremium =
    mySubscription?.status === "Active" &&
    mySubscription?.tier &&
    mySubscription.tier !== "Free";
  const tierLabel = isPremium
    ? `Học viên ${mySubscription!.tier}`
    : "Học viên";

  const joinDate = user?.createdAt
    ? format(new Date(user.createdAt), "dd/MM/yyyy", { locale: vi })
    : "—";

  const location = user?.country ? user.country : null;

  return (
    <div className="p-5 w-full flex flex-col items-center text-center relative z-10 font-mono">
      {/* Nền trang trí nhẹ */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF7A00]/10 blur-2xl rounded-full -mr-8 -mt-8 pointer-events-none" />

      {/* Avatar Section */}
      <div className="relative mb-4 group cursor-pointer">
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-20 h-20 rounded-[1.5rem] object-cover border border-gray-300 dark:border-white/10 shadow-2xl transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out"
          />
        ) : (
          <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 border border-gray-300 dark:border-white/10 flex items-center justify-center shadow-2xl transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out relative overflow-hidden">
            <span className="text-2xl font-black italic text-gray-900 dark:text-white z-10">
              {initials}
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 dark:from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
      </div>

      {/* Name & Username */}
      <div className="space-y-0.5 mb-5">
        <Badge
          variant="outline"
          className="mb-1 border-[#FF7A00]/50 bg-[#FF7A00]/10 text-[#FF7A00] font-bold px-2 py-0 rounded text-[9px] uppercase tracking-widest hover:bg-[#FF7A00]/20 transition-colors"
        >
          {tierLabel}
        </Badge>
        <h2 className="text-xl font-black text-gray-900 dark:text-white leading-none tracking-tighter italic uppercase drop-shadow-sm">
          {user?.username ?? "Người dùng"}
        </h2>
        <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 tracking-wider hover:text-gray-700 dark:hover:text-zinc-300 transition-colors cursor-pointer">
          {user?.email ?? ""}
        </p>
      </div>

      {/* Info Grid */}
      <div className="w-full space-y-2 mb-5">
        {location && (
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 transition-all hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/10 group/item">
            <div className="p-1.5 bg-gray-200 dark:bg-zinc-900 rounded-lg shadow-inner border border-gray-300 dark:border-white/5 group-hover/item:text-[#FF7A00] transition-colors">
              <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-zinc-400 group-hover/item:text-[#FF7A00] transition-colors" />
            </div>
            <span className="text-[10px] font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-tight group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
              {location}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 transition-all hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/10 group/item">
          <div className="p-1.5 bg-gray-200 dark:bg-zinc-900 rounded-lg shadow-inner border border-gray-300 dark:border-white/5 group-hover/item:text-[#FF7A00] transition-colors">
            <Calendar className="h-3.5 w-3.5 text-gray-500 dark:text-zinc-400 group-hover/item:text-[#FF7A00] transition-colors" />
          </div>
          <div className="text-left flex flex-col justify-center">
            <p className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase leading-none group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
              Gia nhập: <span className="text-gray-700 dark:text-zinc-300">{joinDate}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full mt-auto">
        <Button
          className="w-full h-10 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:from-orange-600 hover:to-orange-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-900/20 border border-white/10 transition-all active:scale-95"
          onClick={() => router.push("/profile/edit")}
        >
          <Edit2 className="h-3.5 w-3.5 mr-2" /> Chỉnh sửa thông tin
        </Button>
      </div>
    </div>
  );
}
