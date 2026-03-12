import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Thêm active:scale-95 để tạo hiệu ứng lún khi click, đổi rounded-md thành rounded-xl, font-bold
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]",
  {
    variants: {
      variant: {
        // Màu cam Gradient đặc trưng của DEMIF
        default:
          "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:from-[#FF8A10] hover:to-[#FFAE45] text-white shadow-lg shadow-[#FF7A00]/25 border-none",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 dark:bg-red-500/80 dark:hover:bg-red-500",
        // Nút outline viền mờ (Glassmorphism)
        outline:
          "border border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white shadow-sm",
        // Nút thứ cấp (Nền xám/kính mờ)
        secondary:
          "bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent dark:border-white/5",
        // Nút tàng hình
        ghost:
          "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white",
        // Nút dạng link màu cam
        link: "text-[#FF7A00] underline-offset-8 hover:underline font-black",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4", // Tăng chiều cao mặc định lên 1 chút để dễ bấm
        sm: "h-9 rounded-lg gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 rounded-2xl px-8 text-base has-[>svg]:px-6", // Nút to hơn cho CTA
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
