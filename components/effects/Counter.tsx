"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

type Props = {
  from: number;
  to: number;
  /** Тривалість анімації, мс */
  duration?: number;
};

/** Лічильник, що анімується від from до to при появі у вʼюпорті (anime.js) */
export default function Counter({ from, to, duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(to);
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const state = { v: from };
          animate(state, {
            v: to,
            duration,
            ease: "outExpo",
            onUpdate: () => {
              el.textContent = String(Math.round(state.v));
            },
          });
          io.unobserve(el);
        }),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration]);

  return <span ref={ref}>{from}</span>;
}
