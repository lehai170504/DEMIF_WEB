"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState giúp đảm bảo QueryClient chỉ được tạo 1 lần duy nhất trong vòng đời Client
  // và không bị chia sẻ giữa các request trên Server khi render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // CẤU HÌNH CACHE TOÀN CỤC (để đỡ gọi API nhiều)
            // Với Next.js, nên set staleTime > 0 để tránh fetch lại ngay lập tức khi client hydration
            staleTime: 1000 * 60 * 5, // 5 phút
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
