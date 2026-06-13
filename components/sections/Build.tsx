"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { createTimeline, onScroll, utils } from "animejs";
import Reveal from "@/components/effects/Reveal";
import styles from "./Build.module.css";

const STEPS = [
  {
    title: "Готова основа сьогодні",
    text: "Цегляні стіни, новий дах, встановлені вікна та двері, підведені комунікації. Об'єкт продається «як є» — без зайвих робіт, із документами у власності.",
  },
  {
    title: "Ваше наповнення",
    text: "Далі — лише ваш сценарій: внутрішнє оздоблення під формат і благоустрій 0,5 га навколо — двір, доріжки, зона біля ставка, озеленення.",
  },
  {
    title: "Запуск",
    text: "Світло у вікнах, вивіска, відчинені двері — і ви приймаєте перших гостей: ресторан, SPA-комплекс чи готель за вашим вибором.",
  },
];

const STEP_DELAYS = [".05s", ".18s", ".31s"];

type Piece = {
  t: "brick" | "brickD" | "roof" | "found" | "win" | "door" | "sign" | "tree" | "pond" | "chim" | "glow";
  w: number;
  h: number;
  x: number;
  y: number;
  z: number;
  rx?: number;
  ry?: number;
  at: number;
  dur: number;
  lit?: boolean;
  label?: string;
};

/** Деталі будівлі у 3D-просторі сцени (origin — центр). Збираються скролом. */
const PIECES: Piece[] = [
  // фундамент / земля
  { t: "found", w: 300, h: 200, x: 0, y: 98, z: 0, rx: 90, at: 80, dur: 820 },
  // передня стіна — 3 смуги
  { t: "brick", w: 260, h: 64, x: 0, y: -64, z: 85, at: 120, dur: 840 },
  { t: "brick", w: 260, h: 64, x: 0, y: 0, z: 85, at: 180, dur: 840 },
  { t: "brick", w: 260, h: 64, x: 0, y: 64, z: 85, at: 240, dur: 840 },
  // бічна стіна — 3 смуги
  { t: "brickD", w: 170, h: 64, x: 130, y: -64, z: 0, ry: 90, at: 160, dur: 840 },
  { t: "brickD", w: 170, h: 64, x: 130, y: 0, z: 0, ry: 90, at: 220, dur: 840 },
  { t: "brickD", w: 170, h: 64, x: 130, y: 64, z: 0, ry: 90, at: 280, dur: 840 },
  // дах
  { t: "roof", w: 290, h: 198, x: 0, y: -98, z: 0, rx: 90, at: 360, dur: 920 },
  // комин
  { t: "chim", w: 30, h: 54, x: 80, y: -126, z: 30, at: 480, dur: 700 },
  // вікна 2-го поверху
  { t: "win", w: 44, h: 50, x: -72, y: -48, z: 88, at: 760, dur: 560, lit: true },
  { t: "win", w: 44, h: 50, x: 0, y: -48, z: 88, at: 810, dur: 560, lit: true },
  { t: "win", w: 44, h: 50, x: 72, y: -48, z: 88, at: 860, dur: 560, lit: true },
  // вікна 1-го поверху + двері
  { t: "win", w: 46, h: 58, x: -82, y: 46, z: 88, at: 910, dur: 560, lit: true },
  { t: "win", w: 46, h: 58, x: 82, y: 46, z: 88, at: 960, dur: 560, lit: true },
  { t: "door", w: 52, h: 84, x: 0, y: 50, z: 88, at: 1020, dur: 560 },
  // благоустрій
  { t: "pond", w: 132, h: 46, x: 168, y: 96, z: -8, rx: 90, at: 1500, dur: 820 },
  { t: "tree", w: 76, h: 98, x: -182, y: 42, z: 64, at: 1600, dur: 760 },
  { t: "tree", w: 54, h: 74, x: 210, y: 54, z: 34, at: 1720, dur: 760 },
  // запуск
  { t: "glow", w: 460, h: 320, x: 0, y: 10, z: -40, at: 2250, dur: 820 },
  { t: "sign", w: 124, h: 26, x: 0, y: 6, z: 92, at: 2480, dur: 540, label: "ВІДКРИТО" },
];

const rnd = (a: number) => (Math.random() * 2 - 1) * a;

export default function Build() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 880px)").matches) return;

    const stage = root.querySelector<HTMLElement>("[data-stage]");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-piece]"));
    if (!stage || els.length !== PIECES.length) return;

    const tl = createTimeline({
      defaults: { ease: "linear" },
      autoplay: onScroll({
        target: root,
        enter: "top top",
        leave: "bottom bottom",
        sync: true,
        onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 3))),
      }),
    });

    // Обертання всієї сцени під час скролу — дає 3D-паралакс
    tl.add(stage, { rotateX: [-16, -16], rotateY: [-46, -10], duration: 3300 }, 0);

    PIECES.forEach((p, i) => {
      const el = els[i];
      const rx = p.rx ?? 0;
      const ry = p.ry ?? 0;

      // glow — лише поява, без розльоту
      if (p.t === "glow") {
        utils.set(el, { opacity: 0, scale: 0.6 });
        tl.add(el, { opacity: [0, 1], scale: [0.6, 1], duration: p.dur }, p.at);
        return;
      }

      // рознесена (вибухова) стартова позиція
      const sx = p.x + rnd(330);
      const sy = p.y + rnd(250);
      const sz = p.z + rnd(160) + 220;
      const srx = rx + rnd(160);
      const sry = ry + rnd(160);
      const srz = rnd(120);

      utils.set(el, {
        translateX: sx,
        translateY: sy,
        translateZ: sz,
        rotateX: srx,
        rotateY: sry,
        rotateZ: srz,
        scale: 0.35,
        opacity: 0,
      });

      tl.add(
        el,
        {
          translateX: [sx, p.x],
          translateY: [sy, p.y],
          translateZ: [sz, p.z],
          rotateX: [srx, rx],
          rotateY: [sry, ry],
          rotateZ: [srz, 0],
          scale: [0.35, 1],
          opacity: [0, 1],
          duration: p.dur,
          ease: "out(3)",
        },
        p.at
      );
    });

    // Запуск: вікна загоряються теплим світлом
    PIECES.forEach((p, i) => {
      if (!p.lit) return;
      tl.add(
        els[i],
        {
          backgroundColor: ["#1b2a24", "#f4c66a"],
          boxShadow: [
            "0 0 0 rgba(0,0,0,0)",
            "0 0 22px rgba(244,198,106,.85)",
          ],
          duration: 420,
          ease: "out(2)",
        },
        2300 + i * 45
      );
    });

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <section id="build">
      {/* 3D scroll-сцена (десктоп) */}
      <div ref={wrapRef} className={styles.scene}>
        <div className={styles.sticky}>
          <div className="wrap">
            <div className="eyebrow">Шлях об&apos;єкта</div>
            <h2 className="sec-title">
              Від каркаса — <em>до запуску</em>.
            </h2>
            <div className={styles.grid}>
              <div className={styles.viewport}>
                <div className={styles.stage} data-stage>
                  {PIECES.map((p, i) => (
                    <div
                      key={i}
                      data-piece
                      className={`${styles.piece} ${styles[p.t]}`}
                      style={
                        {
                          width: p.w,
                          height: p.h,
                          marginLeft: -p.w / 2,
                          marginTop: -p.h / 2,
                        } as CSSProperties
                      }
                    >
                      {p.label ? <span>{p.label}</span> : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.steps}>
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className={`${styles.step} ${
                      i === active ? styles.stepActive : ""
                    }`.trim()}
                  >
                    <div className={styles.num}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Фолбек: мобільні / reduced-motion */}
      <div className={`wrap ${styles.fallback}`}>
        <Reveal>
          <div className="eyebrow">Шлях об&apos;єкта</div>
          <h2 className="sec-title">
            Від каркаса — <em>до запуску</em>.
          </h2>
        </Reveal>
        <div className={styles.fbGrid}>
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              className={`${styles.fbCard} glass`}
              delay={STEP_DELAYS[i]}
            >
              <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
