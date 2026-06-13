import styles from "./Marquee.module.css";

const ITEMS = [
  "560 м²",
  "два поверхи",
  "цегла",
  "вікна та двері встановлено",
  "комунікації",
  "ставок",
  "лікувальна вода",
  "Карпати",
  "Хустський район",
];

function Track() {
  return (
    <span className={styles.row}>
      {ITEMS.map((item, i) => (
        <span key={i} className={styles.item}>
          {item}
          <span className={styles.dot}>·</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <Track />
        <Track />
      </div>
    </div>
  );
}
