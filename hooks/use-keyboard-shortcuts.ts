import { useEffect } from "react";

interface ShortcutConfig {
  key: string; // Phím (ví dụ: 'k', 's', 'p')
  ctrl?: boolean; // Có yêu cầu phím Ctrl (hoặc Cmd trên Mac) không
  shift?: boolean; // Có yêu cầu phím Shift không
  alt?: boolean; // Có yêu cầu phím Alt không
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const { key, ctrl, shift, alt, action } = shortcut;

        // Kiểm tra phím chính (không phân biệt hoa thường)
        const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();

        // Kiểm tra các phím bổ trợ (Modifier keys)
        // event.metaKey là phím Command trên Mac, event.ctrlKey là phím Ctrl trên Win
        const isCtrlMatch = ctrl ? event.ctrlKey || event.metaKey : true;
        const isShiftMatch = shift ? event.shiftKey : true;
        const isAltMatch = alt ? event.altKey : true;

        if (isKeyMatch && isCtrlMatch && isShiftMatch && isAltMatch) {
          // Ngăn chặn hành động mặc định của trình duyệt (ví dụ: Ctrl+S là lưu trang)
          event.preventDefault();
          action();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: Gỡ bỏ sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]); // Hook sẽ chạy lại nếu danh sách shortcuts thay đổi
}
