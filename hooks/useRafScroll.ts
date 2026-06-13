"use client";

import { useEffect, useRef } from "react";

/**
 * rAF-тротлений обробник скролу (passive).
 * Викликається одразу при монтуванні, щоб синхронізувати стартовий стан.
 */
export function useRafScroll(handler: (y: number) => void) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handlerRef.current(window.scrollY);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
