import { ReactNode } from "react";
import Reveal from "@/components/effects/Reveal";
import styles from "./Facts.module.css";

const ROWS: { label: string; value: ReactNode }[] = [
  { label: "Площа будівлі", value: "560 м² (280 + 280)" },
  { label: "Поверховість", value: "2 поверхи" },
  { label: "Габарити", value: "14 × 20 м" },
  { label: "Висота приміщень", value: "1 пов. — 3 м · 2 пов. — 4,5 м" },
  { label: "Матеріал", value: "Цегла, металевий дах" },
  { label: "Рік будівництва", value: "з 2008" },
  { label: "Земельна ділянка", value: "0,5 га · у власності" },
  { label: "з них під комерцію", value: "0,12 га (зміна цільового призначення)" },
  { label: "ОСГ", value: "0,38 га" },
  { label: "Цільове призначення", value: "Комерція" },
  { label: "Електрика", value: "Підведена" },
  { label: "Газ / ТНЖ", value: "Підведений" },
  { label: "Каналізація", value: "Є" },
  { label: "Вода", value: "Ставок + лікувальне джерело" },
  { label: "Внутрішній стан", value: "Будівля з перегородками, під оздоблення" },
  { label: "Документи", value: "У наявності, готові до угоди" },
  {
    label: "Ціна",
    value: (
      <>
        $100 000 <span className={styles.note}>· договірна</span>
      </>
    ),
  },
];

export default function Facts() {
  return (
    <section id="facts">
      <div className="wrap">
        <div className={styles.facts}>
          <Reveal>
            <div className="eyebrow">Дані об&apos;єкта</div>
            <h2 className="sec-title">
              Що є <em>сьогодні</em>.
            </h2>
            <p className={styles.intro}>
              Об&apos;єкт пропонується «як є» — комерційна будівля з документами
              та земельною ділянкою у власності. Готова під будь-який внутрішній
              проєкт.
            </p>
          </Reveal>
          <Reveal className={`${styles.list} glass`} delay=".1s" data-glow>
            {ROWS.map((r) => (
              <div key={r.label} className={styles.row}>
                <div className={styles.label}>{r.label}</div>
                <div className={styles.value}>{r.value}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
