import Reveal from "@/components/effects/Reveal";
import styles from "./Location.module.css";

const DISTANCES = [
  { place: "Хуст", dist: "~ 20 км" },
  { place: "Іршава", dist: "~ 25 км" },
  { place: "Мукачево", dist: "~ 55 км" },
  { place: "Ужгород", dist: "~ 90 км" },
  { place: "Кордон зі Словаччиною", dist: "~ 100 км" },
  { place: "Львів", dist: "~ 240 км" },
];

export default function Location() {
  return (
    <section id="location">
      <div className="wrap">
        <div className={styles.grid}>
          <Reveal className={styles.text}>
            <div className="eyebrow">Локація</div>
            <h2 className="sec-title">
              с. Липецька Поляна <em>Хустський район</em>
            </h2>
            <p className={styles.lead}>
              Тихе село серед карпатських схилів, біля лісу. Зручний заїзд
              автомобілем, поряд із основними напрямками Закарпаття — і водночас
              далеко від міського шуму та туристичної штовханини.
            </p>
            <ul className={styles.distances}>
              {DISTANCES.map((d) => (
                <li key={d.place}>
                  <span className={styles.place}>{d.place}</span>
                  <span className={styles.dist}>{d.dist}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.image} delay=".1s" data-glow />
        </div>
      </div>
    </section>
  );
}
