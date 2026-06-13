import Reveal from "@/components/effects/Reveal";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className={styles.about}>
          <Reveal className={styles.text}>
            <div className="eyebrow">Про об&apos;єкт</div>
            <h2 className="sec-title">
              Комерційна будівля в Карпатах. Чим це буде — <em>вирішуєте ви</em>.
            </h2>
            <p className={styles.lede}>
              Будівля проєктувалася під ресторан, бар і весільний зал — але
              великий метраж, гнучке планування та особлива територія дозволяють
              зробити з цього <em>значно більше</em>.
            </p>
            <p className={styles.body}>
              Дві площі по 280 м² на поверх, разом 560 м². Цегляні стіни, новий
              металевий дах, вікна та двері встановлено. Внутрішні перегородки на
              першому поверсі вже сформовані за оригінальним планом — кухня,
              зали, підсобки. Другий поверх — вільний простір під ваш сценарій.
            </p>
          </Reveal>
          <Reveal className={styles.image} delay=".1s" data-glow />
        </div>
      </div>
    </section>
  );
}
