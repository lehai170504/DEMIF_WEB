export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        {children}
      </div>
    </section>
  );
}
