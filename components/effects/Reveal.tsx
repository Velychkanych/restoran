"use client";

import { CSSProperties, ElementType, ReactNode, useEffect, useRef } from "react";

type Props = {
  children?: ReactNode;
  /** Додаткові класи (наприклад, "glass" або клас із CSS-модуля) */
  className?: string;
  /** Затримка появи, як --d (".15s") */
  delay?: string;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
  "data-glow"?: boolean;
};

/**
 * Обгортка scroll-reveal: додає клас "in", коли елемент входить у вʼюпорт.
 */
export default function Reveal({
  children,
  className = "",
  delay,
  as: Tag = "div",
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mergedStyle: CSSProperties | undefined = delay
    ? ({ ...style, "--d": delay } as CSSProperties)
    : style;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
