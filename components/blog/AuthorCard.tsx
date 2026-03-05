"use client";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorCardProps {
  author: {
    name: string;
    role: string;
    bio: string;
    avatar?: string;
  };
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <>
      <Separator className="my-8 bg-gray-200 dark:bg-white/10" />
      <div className="p-8 rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 relative overflow-hidden group">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] group-hover:bg-orange-500/10 transition-colors duration-500 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <Avatar className="w-20 h-20 border-2 border-orange-500/50 shadow-lg shadow-orange-500/20">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold text-2xl">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-400 transition-colors">
              {author.name}
            </h3>
            <p className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mb-3">
              {author.role}
            </p>
            <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
