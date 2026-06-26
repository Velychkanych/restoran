"use client";

import { useRef } from "react";
import Counter from "@/components/effects/Counter";
import HeroTitle from "@/components/effects/HeroTitle";
import { useRafScroll } from "@/hooks/useRafScroll";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Паралакс при скролі: фон заглиблюється, контент підіймається і тане.
  useRafScroll((y) => {
    const hero = heroRef.current;
    const slides = slidesRef.current;
    const inner = innerRef.current;
    if (!hero || !slides || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const h = hero.offsetHeight || window.innerHeight;
    const p = Math.min(Math.max(y / h, 0), 1); // 0 → 1 поки гортаємо hero

    // фон їде повільніше за скрол і трохи наближається
    slides.style.transform = `translate3d(0, ${y * 0.4}px, 0) scale(${1 + p * 0.12})`;
    // контент підіймається швидше й м'яко зникає
    inner.style.transform = `translate3d(0, ${-y * 0.18}px, 0)`;
    inner.style.opacity = String(Math.max(1 - p * 1.25, 0));
  });

  return (
    <header className={styles.hero} id="top" ref={heroRef}>
      <div className={styles.slides} ref={slidesRef}>
        <div className={styles.slide} />
        <div className={styles.slide} />
        <div className={styles.slide} />
        <div className={styles.slide} />
      </div>
      <div className={styles.overlay} />

      <div className={styles.inner} ref={innerRef}>
        <div className={styles.eyebrow}>
          Закарпаття · Хустський район · з 2008
        </div>

        <HeroTitle raw="Готова основа для бізнесу в Карпатах <em>з власною лікувальною водою.</em>" />

        <p className={styles.tagline}>
          560 м² цегляної будівлі на 0.5 га з природним ставком і виходом
          лікувальних підземних вод. Закарпаття, Хустський район — там, де ще є
          місце для чогось справжнього.
        </p>

        <div className={styles.ctas}>
          <a className="btn btn-copper" href="#about" data-magnetic>
            Переглянути об&apos;єкт
          </a>
          <a className="btn btn-ghost" href="#water" data-droplets>
            Лікувальна вода
          </a>
          <a className="btn btn-ghost" href="#location">
            Локація
          </a>
        </div>

        <div className={styles.stats}>
          <div className={`${styles.stat} glass`} data-glow>
            <b>
              <Counter from={0} to={560} />
              <sup>м²</sup>
            </b>
            <span>Площа будівлі</span>
          </div>
          <div className={`${styles.stat} glass`} data-glow>
            <b>
              <Counter from={0} to={2} />
            </b>
            <span>Поверхи</span>
          </div>
          <div className={`${styles.stat} glass`} data-glow>
            <b>
              <Counter from={1990} to={2008} />
            </b>
            <span>Рік закладки</span>
          </div>
          <div className={`${styles.stat} glass`} data-glow>
            <b>+</b>
            <span>Ставок та джерело</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Гортати
      </div>
    </header>
  );
}
