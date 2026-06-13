"use client";

import { useCallback, useEffect, useState } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#about", label: "Об'єкт" },
  { href: "#water", label: "Лікувальна вода" },
  { href: "#use-cases", label: "Концепції" },
  { href: "#facts", label: "Дані" },
  { href: "#location", label: "Локація" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useRafScroll((y) => setScrolled(y > 30));

  // Блокування скролу під відкритим мобільним меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`.trim()}>
      <nav className={styles.inner}>
        <a className={styles.logo} href="#top" aria-label="На початок">
          <span className={styles.dot} />
          Об&apos;єкт · Липецька Поляна
        </a>
        <div className={`${styles.links} ${open ? styles.open : ""}`.trim()}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <a className={styles.cta} href="#contact" onClick={closeMenu}>
            <PhoneIcon />
            Зв&apos;язатися
          </a>
        </div>
        <a className={styles.cta} href="#contact">
          <PhoneIcon />
          Зв&apos;язатися
        </a>
        <button
          className={styles.burger}
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>
    </header>
  );
}

function PhoneIcon() {
  return (
    <span className={styles.ctaIcon} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    </span>
  );
}
