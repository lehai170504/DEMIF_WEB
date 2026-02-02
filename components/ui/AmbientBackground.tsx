// src/components/ui/AmbientBackground.tsx
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Nền noise hạt nhẹ */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

      {/* Ánh sáng cam góc trên phải */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px]" />

      {/* Ánh sáng tím/xanh góc dưới trái */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]" />

      {/* Grid mờ (nếu muốn áp dụng toàn trang) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}
