import Link from 'next/link';
import { Package2, Home, BarChart3, Users, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminSidebar() {
  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/lessons", icon: BookOpen, label: "Bài Tập" },
    { href: "/admin/users", icon: Users, label: "Người Dùng" },
    { href: "/admin/analytics", icon: BarChart3, label: "Phân Tích" },
  ];
  
  return (
    <aside className="hidden md:flex h-full w-64 flex-col border-r bg-background fixed left-0 top-0">
      <div className="flex h-16 items-center justify-center border-b px-4 lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="text-lg">Admin Panel</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = typeof window !== 'undefined' && window.location.pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start text-left"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="mt-auto p-4 border-t">
        <Link href="/admin/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-3" />
            Cài đặt
          </Button>
        </Link>
      </div>
    </aside>
  );
}