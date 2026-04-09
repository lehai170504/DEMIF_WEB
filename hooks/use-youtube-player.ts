"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Hook điều khiển YouTube iframe qua postMessage thuần.
 * KHÔNG dùng new YT.Player() để tránh reload/blank iframe.
 *
 * @param onTimeUpdate - Callback nhận currentTime (giây) khi YouTube đang phát.
 *                       YouTube gửi infoDelivery ~250ms/lần khi playing.
 */
export function useYoutubePlayer(onTimeUpdate?: (time: number) => void) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Sync callback ref không cần deps
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  // Lắng nghe message từ YouTube iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!data || typeof data !== "object") return;

        // infoDelivery: YouTube gửi currentTime định kỳ khi đang play
        if (data.event === "infoDelivery" && typeof data.info?.currentTime === "number") {
          onTimeUpdateRef.current?.(data.info.currentTime);
        }
      } catch {
        /* ignore parse errors */
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  /** Gửi command tới YouTube iframe qua postMessage */
  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  }, []);

  /**
   * Callback ref cho <iframe ref={setIframeRef}>.
   * Đăng ký lắng nghe events từ YouTube sau khi iframe mount.
   */
  const setIframeRef = useCallback((el: HTMLIFrameElement | null) => {
    iframeRef.current = el;
    if (el) {
      // Subscribe để nhận infoDelivery events từ YouTube
      // Gửi sau 1s để chắc chắn iframe đã load xong
      const subscribe = () => {
        el.contentWindow?.postMessage(
          JSON.stringify({ event: "listening" }),
          "*",
        );
      };
      setTimeout(subscribe, 1000);
      setTimeout(subscribe, 2500); // Retry lần 2
    }
  }, []);

  /**
   * Seek đến startTime và tự play. Không tự dừng.
   * Gửi command 2 lần (retry 300ms) để đảm bảo delivery.
   */
  const seekAndPlay = useCallback(
    (startTime: number) => {
      const send = () => {
        sendCommand("seekTo", [startTime, true]);
        sendCommand("playVideo", []);
      };
      send();
      setTimeout(send, 300);
    },
    [sendCommand],
  );

  /** Chỉ seek, không play */
  const seekTo = useCallback(
    (startTime: number) => {
      sendCommand("seekTo", [startTime, true]);
    },
    [sendCommand],
  );

  /** Pause video */
  const pauseVideo = useCallback(() => {
    sendCommand("pauseVideo", []);
  }, [sendCommand]);

  return { setIframeRef, iframeRef, seekAndPlay, seekTo, pauseVideo };
}
