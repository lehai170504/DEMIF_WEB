"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Globe,
  MapPin,
} from "lucide-react";
import { useCreateUser } from "@/hooks/use-create-user";
import { CreateUserSchema, CreateUserFormValues } from "@/schemas/user.schema";

export default function AddAdminDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  // 1. Setup Form
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      country: "Vietnam", // Default Value
      nativeLanguage: "Vietnamese",
      targetLanguage: "English",
      roles: ["Admin"], // Default Role
    },
  });

  // 2. API Hook
  const { mutate, isPending } = useCreateUser();

  // 3. Handle Submit
  const onSubmit = (data: CreateUserFormValues) => {
    mutate(
      {
        ...data,
        roles: ["Admin"],
        avatarUrl:
          data.avatarUrl ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      },
    );
  };

  React.useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-[1.5rem] font-mono bg-[#18181b] border-white/10 text-zinc-100 shadow-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-white/5 bg-gradient-to-br from-orange-500/10 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px] rounded-full pointer-events-none" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-white">
              <ShieldCheck className="h-5 w-5 text-orange-500" /> Thêm Quản Trị
              Viên
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs font-medium mt-1.5 leading-relaxed">
              Tạo tài khoản mới và cấp quyền{" "}
              <span className="text-white font-bold">Super Admin</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Row 1: Username & Email */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                        <User className="h-3 w-3" /> Tên đăng nhập
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="vd: admin_01"
                          className="form-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                        <Mail className="h-3 w-3" /> Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@demif.com"
                          className="form-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <Lock className="h-3 w-3" /> Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="form-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] text-red-400" />
                  </FormItem>
                )}
              />

              {/* Row 3: Country (New) */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> Quốc gia
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Vietnam"
                        className="form-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] text-red-400" />
                  </FormItem>
                )}
              />

              {/* Row 4: Languages */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <FormField
                  control={form.control}
                  name="nativeLanguage"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                        <Globe className="h-3 w-3" /> Tiếng mẹ đẻ
                      </FormLabel>
                      <FormControl>
                        <Input className="form-input text-xs" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetLanguage"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                        <Globe className="h-3 w-3 text-blue-500" /> Ngôn ngữ học
                      </FormLabel>
                      <FormControl>
                        <Input className="form-input text-xs" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Footer */}
              <DialogFooter className="mt-6 pt-4 border-t border-white/5">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-white/10"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="mr-2 h-4 w-4 text-orange-600" />
                  )}
                  {isPending ? "Đang xử lý..." : "Xác nhận tạo Admin"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
