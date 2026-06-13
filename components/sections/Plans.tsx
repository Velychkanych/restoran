/* eslint-disable @next/next/no-img-element */
import Reveal from "@/components/effects/Reveal";
import styles from "./Plans.module.css";

const PLANS = [
  {
    title: "Перший поверх",
    meta: "280 м² · h 3 м · сформовані зони",
    img: "/images/plan-floor1.jpg",
    alt: "План першого поверху",
  },
  {
    title: "Другий поверх",
    meta: "280 м² · h 4,5 м · вільний простір",
    img: "/images/plan-floor2.jpg",
    alt: "План другого поверху",
  },
];

export default function Plans() {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <Reveal className={styles.header}>
          <div className="eyebrow">Поверхові плани</div>
          <h2 className="sec-title">
            Планування — <em>гнучке</em>.
          </h2>
        </Reveal>
        <div className={styles.grid}>
          {PLANS.map((p, i) => (
            <Reveal
              key={p.title}
              className={`${styles.card} glass`}
              delay={`${i * 0.1}s`}
            >
              <h4>{p.title}</h4>
              <div className={styles.meta}>{p.meta}</div>
              <img src={p.img} alt={p.alt} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
