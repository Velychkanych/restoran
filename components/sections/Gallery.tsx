"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/effects/Reveal";
import styles from "./Gallery.module.css";

const PHOTOS = [
  "/images/photo-01.jpg",
  "/images/photo-02.jpg",
  "/images/photo-03.jpg",
  "/images/photo-04.jpg",
  "/images/photo-05.jpg",
  "/images/photo-06.jpg",
  "/images/photo-07.jpg",
];

const N = PHOTOS.length;

/** Найкоротша різниця індексів по колу (-N/2..N/2] */
function ringDelta(i: number, active: number) {
  let d = i - active;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

export default function Gallery() {
  const [active, setActive] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  activeRef.current = active;

  const go = useCallback((dir: number) => {
    setActive((a) => (a + dir + N) % N);
  }, []);

  const select = useCallback((i: number) => setActive(i), []);

  // авто-перемикання, пауза при наведенні
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let timer = window.setInterval(() => go(1), 4600);
    const pause = () => clearInterval(timer);
    const resume = () => {
      clearInterval(timer);
      timer = window.setInterval(() => go(1), 4600);
    };
    stage.addEventListener("pointerenter", pause);
    stage.addEventListener("pointerleave", resume);
    return () => {
      clearInterval(timer);
      stage.removeEventListener("pointerenter", pause);
      stage.removeEventListener("pointerleave", resume);
    };
  }, [go]);

  // клавіатура
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  // нахил-паралакс за курсором + свайп/драг
  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let tiltRaf = 0;
    const onMove = (e: PointerEvent) => {
      if (reduce || !fine) return;
      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        tiltRaf = 0;
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ring.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 7}deg)`;
      });
    };
    const onLeave = () => {
      ring.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    // свайп / драг
    let downX: number | null = null;
    const onDown = (e: PointerEvent) => {
      downX = e.clientX;
    };
    const onUp = (e: PointerEvent) => {
      if (downX == null) return;
      const dx = e.clientX - downX;
      downX = null;
      if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    };
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [go]);

  return (
    <section className={styles.section} id="gallery">
      {/* кінематографічний розмитий фон активного фото */}
      <div className={styles.backdrops} aria-hidden="true">
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            className={`${styles.backdrop} ${i === active ? styles.backdropOn : ""}`.trim()}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <div className="eyebrow">Галерея</div>
          <h2 className="sec-title">
            Подивіться <em>зблизька</em>.
          </h2>
        </Reveal>

        <div ref={stageRef} className={styles.stage}>
          <div ref={ringRef} className={styles.ring}>
            {PHOTOS.map((src, i) => {
              const d = ringDelta(i, active);
              const ad = Math.abs(d);
              const sign = Math.sign(d);
              const hidden = ad > 2;
              const x = sign * (ad === 0 ? 0 : 250 + (ad - 1) * 150);
              const z = -ad * 230;
              const ry = -sign * Math.min(ad, 3) * 46;
              const scale = Math.max(1 - ad * 0.16, 0.55);
              const opacity = hidden ? 0 : 1 - ad * 0.28;
              return (
                <button
                  key={src}
                  type="button"
                  className={`${styles.card} ${ad === 0 ? styles.cardActive : ""}`.trim()}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${scale})`,
                    opacity,
                    zIndex: 100 - ad,
                    pointerEvents: hidden ? "none" : "auto",
                  }}
                  aria-label={`Фото ${i + 1}`}
                  aria-hidden={hidden}
                  tabIndex={hidden ? -1 : 0}
                  onClick={() => (ad === 0 ? null : select(i))}
                >
                  <img src={src} alt="" draggable={false} />
                  <span className={styles.sheen} />
                </button>
              );
            })}
          </div>

          <button
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label="Назад"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => go(1)}
            aria-label="Далі"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className={styles.foot}>
          <div className={styles.dots}>
            {PHOTOS.map((src, i) => (
              <button
                key={src}
                className={`${styles.dot} ${i === active ? styles.dotOn : ""}`.trim()}
                onClick={() => select(i)}
                aria-label={`Перейти до фото ${i + 1}`}
              />
            ))}
          </div>
          <div className={styles.counter}>
            <span className={styles.cur}>{String(active + 1).padStart(2, "0")}</span>
            <span className={styles.sep}> / </span>
            <span>{String(N).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
