"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Send,
  MessageSquareText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const contactMethods = [
    {
      name: "Messenger",
      info: "Phản hồi trong vài phút",
      icon: MessageCircle,
      link: "https://m.me/le.hoanghai.90663894",
      color: "bg-blue-500",
    },
    {
      name: "Zalo Chat",
      info: "Kết nối trực tiếp (09xx...)",
      icon: MessageSquareText,
      link: "https://zalo.me/0383546550",
      color: "bg-cyan-500",
    },
    {
      name: "Telegram",
      info: "Hỗ trợ kỹ thuật 24/7",
      icon: Send,
      link: "https://t.me/bonbon175",
      color: "bg-sky-500",
    },
    {
      name: "Gửi Email",
      info: "support@demif.vn",
      icon: Mail,
      link: "mailto:hoanghaile175@gmail.com",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Clock size={14} /> Hệ thống hỗ trợ 24/7
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none"
          >
            Kết nối với <span className="text-[#FF7A00]">DEMIF.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-zinc-400 text-lg font-medium"
          >
            Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ hỗ trợ luôn sẵn sàng
            đồng hành cùng bạn trên con đường chinh phục ngôn ngữ.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={method.link}
                target="_blank"
                className="group relative flex flex-col h-full p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 transition-all duration-500 hover:border-orange-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div
                  className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-500`}
                >
                  <method.icon size={28} />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {method.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-zinc-500 leading-relaxed">
                    {method.info}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Kết nối ngay <ExternalLink size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- OTHER INFO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-10 rounded-[3rem] bg-zinc-900 text-white border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <MapPin size={200} />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Văn phòng đại diện
              </h2>
              <div className="space-y-4 text-zinc-400 font-medium">
                <p className="flex items-center gap-3">
                  <MapPin size={18} className="text-orange-500" />
                  Hanoi • Saigon • Danang
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={18} className="text-orange-500" />
                  038.3545.6550 (08:00 - 21:00)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
