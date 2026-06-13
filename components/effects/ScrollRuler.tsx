"use client";

import { useRef } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";
import styles from "./ScrollRuler.module.css";

const TICKS = Array.from({ length: 11 }, (_, i) => i); // 0..10 → кожні 10%

/** Архітектурна лінійка-індикатор прогресу скролу (маркер їде вниз). */
export default function ScrollRuler() {
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useRafScroll(() => {
    const fill = fillRef.current;
    const marker = markerRef.current;
    const pct = pctRef.current;
    if (!fill || !marker || !pct) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    fill.style.height = `${p * 100}%`;
    marker.style.top = `${p * 100}%`;
    pct.textContent = String(Math.round(p * 100));
  });

  return (
    <div className={styles.ruler} aria-hidden="true">
      <div className={styles.line} />
      <div ref={fillRef} className={styles.fill} />

      {TICKS.map((i) => (
        <span
          key={i}
          className={`${styles.tick} ${i % 5 === 0 ? styles.major : ""}`.trim()}
          style={{ top: `${i * 10}%` }}
        />
      ))}

      <span className={`${styles.cap} ${styles.capTop}`}>0</span>
      <span className={`${styles.cap} ${styles.capBot}`}>100</span>

      <div ref={markerRef} className={styles.marker} style={{ top: "0%" }}>
        <span ref={pctRef} className={styles.pct}>
          0
        </span>
        <span className={styles.arrow} />
      </div>
    </div>
  );
}
