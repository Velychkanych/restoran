"use client";

import { useEffect } from "react";
import { animate } from "animejs";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Глобальні мікро-інтеракції (один компонент на сторінку):
 *
 * 1. Lenis — інерційний скрол + плавний скрол до якорів.
 * 2. Магнітні кнопки — [data-magnetic] тягнуться за курсором, повертаються з пружиною.
 * 3. Cursor-glow — водяна пляма світла за курсором на картках [data-glow].
 * 4. Водяні краплі, що вилітають із кнопок [data-droplets].
 *
 * Все вимикається при prefers-reduced-motion та на грубих вказівниках.
 */

/** Міні-крапля води в бренд-кольорах */
function dropSvg(): string {
  return (
    '<svg viewBox="0 0 24 32" width="100%" height="100%" aria-hidden="true">' +
    '<path d="M12 1C12 1 3 13 3 20a9 9 0 0 0 18 0C21 13 12 1 12 1Z" fill="#5fa3b8"/>' +
    '<path d="M12 1C12 1 3 13 3 20a9 9 0 0 0 18 0C21 13 12 1 12 1Z" fill="url(#g)" opacity="0.5"/>' +
    '<ellipse cx="9" cy="18" rx="2.4" ry="3.4" fill="rgba(255,255,255,.45)"/>' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#bfe6f0"/><stop offset="1" stop-color="#3d7d8f"/>' +
    "</linearGradient></defs></svg>"
  );
}

function spawnDrop(btn: HTMLElement) {
  const rect = btn.getBoundingClientRect();
  if (!rect.width) return;
  const h = 18 + Math.random() * 14;
  const drop = document.createElement("span");
  drop.className = "hm-drop-float";
  drop.style.width = `${h * 0.75}px`;
  drop.style.height = `${h}px`;
  drop.style.left = `${rect.left + rect.width * (0.2 + Math.random() * 0.6) - h / 4}px`;
  drop.style.top = `${rect.top + rect.height * (0.3 + Math.random() * 0.3) - h / 2}px`;
  drop.style.setProperty("--dx", `${Math.random() * 44 - 22}px`);
  drop.style.setProperty("--dy", `${-(80 + Math.random() * 80)}px`);
  drop.style.animationDuration = `${1100 + Math.random() * 500}ms`;
  drop.innerHTML = dropSvg();
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 1800);
}

export default function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ---------- Lenis ----------
    const lenis = new Lenis({ lerp: 0.12 });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Плавний скрол до якорів на тій самій сторінці
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href*="#"]'
      );
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#") && !href.includes("#")) return;
      const hash = href.startsWith("#") ? href : href.slice(href.indexOf("#"));
      if (hash.length < 2) return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", hash);
      lenis.scrollTo(target, { offset: -72 });
    };
    document.addEventListener("click", onAnchorClick);

    if (!finePointer) {
      return () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("click", onAnchorClick);
        lenis.destroy();
      };
    }

    // ---------- Магнітні кнопки ----------
    const MAGNET_RADIUS = 90;
    const MAGNET_PULL = 0.3;
    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );

    const onMagnetMove = (e: PointerEvent) => {
      for (const el of magnets) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const reach = MAGNET_RADIUS + Math.max(r.width, r.height) / 2;
        if (dist < reach) {
          el.style.transform = `translate(${dx * MAGNET_PULL}px, ${
            dy * MAGNET_PULL
          }px)`;
          el.dataset.magnetActive = "1";
        } else if (el.dataset.magnetActive) {
          delete el.dataset.magnetActive;
          el.style.transform = "";
          animate(el, {
            x: 0,
            y: 0,
            ease: "outElastic(1, .45)",
            duration: 650,
          });
        }
      }
    };

    // ---------- Cursor-glow ----------
    let glowRaf = 0;
    let lastGlow: HTMLElement | null = null;
    const onGlowMove = (e: PointerEvent) => {
      if (glowRaf) return;
      glowRaf = requestAnimationFrame(() => {
        glowRaf = 0;
        const target =
          (e.target as HTMLElement | null)?.closest<HTMLElement>(
            "[data-glow]"
          ) ?? null;
        if (lastGlow && lastGlow !== target) {
          lastGlow.style.removeProperty("--glow-o");
          lastGlow = null;
        }
        if (!target) return;
        const r = target.getBoundingClientRect();
        target.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
        target.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
        target.style.setProperty("--glow-o", "1");
        lastGlow = target;
      });
    };

    // ---------- Водяні краплі з [data-droplets] ----------
    let dropTimer: ReturnType<typeof setInterval> | null = null;
    let dropBtn: HTMLElement | null = null;

    const stopDrops = () => {
      if (dropTimer) clearInterval(dropTimer);
      dropTimer = null;
      dropBtn = null;
    };
    const onDropOver = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-droplets]"
      );
      if (!btn || btn === dropBtn) return;
      stopDrops();
      dropBtn = btn;
      spawnDrop(btn);
      dropTimer = setInterval(() => spawnDrop(btn), 360);
    };
    const onDropOut = (e: PointerEvent) => {
      if (!dropBtn) return;
      const to = e.relatedTarget as Node | null;
      if (to && dropBtn.contains(to)) return;
      if (!dropBtn.contains(e.target as Node)) return;
      stopDrops();
    };
    const onDropClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-droplets]"
      );
      if (!btn) return;
      for (let i = 0; i < 6; i++) setTimeout(() => spawnDrop(btn), i * 45);
    };

    document.addEventListener("pointerover", onDropOver, { passive: true });
    document.addEventListener("pointerout", onDropOut, { passive: true });
    document.addEventListener("click", onDropClick);
    document.addEventListener("pointermove", onMagnetMove, { passive: true });
    document.addEventListener("pointermove", onGlowMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (glowRaf) cancelAnimationFrame(glowRaf);
      stopDrops();
      lenis.destroy();
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("pointerover", onDropOver);
      document.removeEventListener("pointerout", onDropOut);
      document.removeEventListener("click", onDropClick);
      document.removeEventListener("pointermove", onMagnetMove);
      document.removeEventListener("pointermove", onGlowMove);
    };
  }, []);

  return null;
}
