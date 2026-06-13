"use client";

import { useRef } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./AmbientBackground.module.css";

const BLOBS = [
  { className: styles.b1, speed: 0.12 },
  { className: styles.b2, speed: -0.08 },
  { className: styles.b3, speed: 0.16 },
];

/** Фонові «бульби» (водяні/теплі) з паралаксом при скролі */
export default function AmbientBackground() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useRafScroll((y) => {
    if (reduceMotion) return;
    BLOBS.forEach((blob, i) => {
      const el = refs.current[i];
      if (el) el.style.transform = `translateY(${y * blob.speed}px)`;
    });
  });

  return (
    <div className={styles.ambient} aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`${styles.blob} ${blob.className}`}
        />
      ))}
    </div>
  );
}
