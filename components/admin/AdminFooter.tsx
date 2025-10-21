export default function AdminFooter() {
  return (
    <footer className="mt-auto border-t bg-background p-4 md:p-6 md:ml-64">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
        <p>Phiên bản 1.0.0</p>
      </div>
    </footer>
  );
}