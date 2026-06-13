import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.meta}>
        с. Липецька Поляна, Хустський район, Закарпатська обл.
      </div>
      © 2026 · приватний продаж від власника
    </footer>
  );
}
