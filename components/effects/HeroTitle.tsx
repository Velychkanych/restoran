"use client";

import { Fragment, useEffect, useRef } from "react";
import { animate, stagger, spring, utils } from "animejs";
import styles from "@/components/sections/Hero.module.css";

type Segment = { text: string; em: boolean };

/** Розбирає рядок виду "Готова основа <em>з власною лікувальною водою</em>" */
function parseTitle(raw: string): Segment[] {
  const segments: Segment[] = [];
  const re = /<em>(.*?)<\/em>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    if (m.index > last)
      segments.push({ text: raw.slice(last, m.index), em: false });
    segments.push({ text: m[1], em: true });
    last = m.index + m[0].length;
  }
  if (last < raw.length) segments.push({ text: raw.slice(last), em: false });
  return segments;
}

function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className={styles.word}>
            {[...word].map((ch, ci) => (
              <span key={ci} className={styles.char}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Hero-заголовок із появою по літерах (anime.js, пружинна фізика).
 * При reduced motion заголовок просто статичний.
 */
export default function HeroTitle({ raw }: { raw: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = el.querySelectorAll(`.${styles.char}`);
    utils.set(chars, { opacity: 0, y: "0.6em", rotate: 5 });
    const animation = animate(chars, {
      opacity: { to: 1, duration: 320, ease: "out(2)" },
      y: "0em",
      rotate: 0,
      delay: stagger(22, { start: 240 }),
      ease: spring({ stiffness: 140, damping: 13 }),
    });
    return () => {
      animation.cancel();
    };
  }, []);

  const segments = parseTitle(raw);

  return (
    <h1
      ref={ref}
      className={styles.title}
      aria-label={raw
        .replace(/<\/?em>/g, " ")
        .replace(/\s+/g, " ")
        .trim()}
    >
      {segments.map((seg, i) => {
        // зберігаємо пробіл на межі сегментів (інакше "Карпатах" і "з" злипаються)
        const needsSpace =
          i > 0 &&
          (/\s$/.test(segments[i - 1].text) || /^\s/.test(seg.text));
        return (
          <Fragment key={i}>
            {needsSpace ? " " : null}
            {seg.em ? (
              <em aria-hidden="true">
                <Words text={seg.text} />
              </em>
            ) : (
              <span aria-hidden="true">
                <Words text={seg.text} />
              </span>
            )}
          </Fragment>
        );
      })}
    </h1>
  );
}
