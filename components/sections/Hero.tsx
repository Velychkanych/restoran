import Counter from "@/components/effects/Counter";
import HeroTitle from "@/components/effects/HeroTitle";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <header className={styles.hero} id="top">
      <div className={styles.slides}>
        <div className={styles.slide} />
        <div className={styles.slide} />
        <div className={styles.slide} />
        <div className={styles.slide} />
      </div>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          Закарпаття · Хустський район · з 2008
        </div>

        <HeroTitle raw="Готова основа для бізнесу в Карпатах <em>з власною лікувальною водою.</em>" />

        <p className={styles.tagline}>
          560 м² цегляної будівлі на 0.5 га з природним ставком і виходом
          лікувальних підземних вод. Закарпаття, Хустський район — там, де ще є
          місце для чогось справжнього.
        </p>

        <div className={styles.ctas}>
          <a className="btn btn-copper" href="#about" data-magnetic>
            Переглянути об&apos;єкт
          </a>
          <a className="btn btn-ghost" href="#water" data-droplets>
            Лікувальна вода
          </a>
          <a className="btn btn-ghost" href="#location">
            Локація
          </a>
        </div>

        <div className={styles.stats}>
          <div className={`${styles.stat} glass`} data-glow>
            <b>
              <Counter from={0} to={560} />
              <sup>м²</sup>
            </b>
            <span>Площа будівлі</span>
          </div>
          <div className={`${styles.stat} glass`} data-glow>
            <b>
              <Counter from={0} to={2} />
            </b>
            <span>Поверхи</span>
          </div>
          <div className={`${styles.stat} glass`} data-glow>
            <b>
              <Counter from={1990} to={2008} />
            </b>
            <span>Рік закладки</span>
          </div>
          <div className={`${styles.stat} glass`} data-glow>
            <b>+</b>
            <span>Ставок та джерело</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Гортати
      </div>
    </header>
  );
}
