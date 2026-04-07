import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white shadow-lg shadow-[#FF7A00]/25 hover:shadow-[#FF7A00]/40 hover:brightness-110 border-none",

        destructive:
          "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",

        outline:
          "border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-slate-100 shadow-sm",

        secondary:
          "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-zinc-700 border border-transparent dark:border-white/5",

        ghost:
          "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",

        link: "text-[#FF7A00] underline-offset-8 hover:underline font-black",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg gap-1.5 px-4",
        lg: "h-14 rounded-2xl px-8 text-base shadow-xl shadow-orange-500/10",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      suppressHydrationWarning
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
