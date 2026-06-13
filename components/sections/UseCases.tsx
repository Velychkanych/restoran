import Reveal from "@/components/effects/Reveal";
import styles from "./UseCases.module.css";

const CASES = [
  {
    num: "I —",
    title: "Wellness / SPA-комплекс",
    text: "Найочевидніший і найприбутковіший сценарій з огляду на лікувальну воду. Бальнеологія, SPA, оздоровчі ретрити — формат, на який є постійний попит з усієї України.",
    items: [
      "10–15 номерів на другому поверсі",
      "Зона процедур, басейн, сауна на першому",
      "Простір для йоги та занять на території",
    ],
  },
  {
    num: "II —",
    title: "Ресторан і весільний комплекс",
    text: "Початкове призначення об'єкта. Планування вже передбачає великий зал, професійну кухню, підсобні та технічні приміщення.",
    items: [
      "Банкетний зал на 120–150 гостей",
      "Окрема кухня з виходом на двір",
      "Виїзні церемонії просто неба біля ставка",
    ],
  },
  {
    num: "III —",
    title: "База відпочинку чи готель",
    text: "Карпатський туризм стабільно зростає, а локація поза курортною штовханиною — це окрема перевага. Тиша, ліс, своя вода.",
    items: [
      "15–20 номерів різного формату",
      "Ресторан як обов'язковий елемент",
      "Місце під альтанки, паркінг, ігрову зону",
    ],
  },
];

export default function UseCases() {
  return (
    <section className={styles.section} id="use-cases">
      <div className="wrap">
        <Reveal className={styles.header}>
          <div className="eyebrow">Концепції використання</div>
          <h2 className="sec-title">
            Один об&apos;єкт — <em>кілька сценаріїв</em>.
          </h2>
        </Reveal>
        <div className={styles.grid}>
          {CASES.map((c, i) => (
            <Reveal
              key={c.num}
              className={`${styles.card} glass`}
              delay={`${i * 0.1}s`}
              data-glow
            >
              <div className={styles.num}>{c.num}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
