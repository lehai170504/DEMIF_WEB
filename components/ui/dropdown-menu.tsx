"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 8, // Tăng nhẹ offset cho thoáng
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          // Hiển thị chuẩn chỉnh: Nền kính mờ, Bo góc lớn hơn, Shadow sâu
          "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl text-slate-900 dark:text-slate-200 border-slate-200 dark:border-white/10 z-50 min-w-[12rem] overflow-hidden rounded-2xl border p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Chỉnh màu Hover sang màu Cam thương hiệu hoặc Slate đậm
        "relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
        "focus:bg-slate-100 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white",
        // Biến thể destructive (Xóa/Gỡ)
        "data-[variant=destructive]:text-red-500 data-[variant=destructive]:focus:bg-red-50 dark:data-[variant=destructive]:focus:bg-red-500/10 data-[variant=destructive]:focus:text-red-600",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:text-slate-400 group-focus:[&_svg]:text-[#FF7A00]",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-xl py-2.5 pr-3 pl-9 text-sm font-medium outline-none transition-colors focus:bg-slate-100 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-3 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-[#FF7A00]" strokeWidth={3} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-xl py-2.5 pr-3 pl-9 text-sm font-medium outline-none transition-colors focus:bg-slate-100 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-3 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-[#FF7A00] text-[#FF7A00]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 data-[inset]:pl-9",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        "bg-slate-100 dark:bg-white/5 -mx-1.5 my-1.5 h-px",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-slate-400 dark:text-slate-600 ml-auto text-[10px] font-bold tracking-widest uppercase",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors focus:bg-slate-100 dark:focus:bg-white/5 focus:text-slate-900 dark:focus:text-white data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-white/5 data-[inset]:pl-9",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4 text-slate-400" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl text-slate-900 dark:text-slate-200 border-slate-200 dark:border-white/10 z-50 min-w-[10rem] overflow-hidden rounded-2xl border p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
