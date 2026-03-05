"use client";

import { Card } from "@/components/ui/card";
import { List } from "lucide-react";

interface TableOfContentsProps {
  sections: Array<{ id: string; title: string }>;
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  if (sections.length === 0) return null;

  return (
    <Card className="sticky top-28 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] overflow-hidden rounded-[2rem]">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-zinc-400">
          <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <List className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-sm uppercase tracking-widest">
            Mục lục
          </h3>
        </div>
        <ul className="space-y-3 relative border-l border-gray-200 dark:border-white/10 ml-2.5 pl-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm font-medium text-gray-600 dark:text-zinc-500 hover:text-orange-500 transition-colors flex items-start gap-3 group relative"
              >
                <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-zinc-700 group-hover:bg-orange-500 transition-colors" />
                <span className="group-hover:translate-x-1 transition-transform leading-relaxed">
                  {section.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
