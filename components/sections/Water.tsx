import Reveal from "@/components/effects/Reveal";
import styles from "./Water.module.css";

export default function Water() {
  return (
    <section className={styles.water} id="water">
      <div className={styles.mesh} aria-hidden="true" />
      <div className={`wrap ${styles.content}`}>
        <Reveal>
          <div className="eyebrow">Те, що змінює все</div>
          <h2 className="sec-title">
            На території — вихід <em>лікувальних</em> підземних вод.
          </h2>
        </Reveal>
        <Reveal className={styles.text} delay=".1s">
          <p>
            Закарпаття — один з небагатьох регіонів Європи з природним багатством
            мінеральних і лікувальних джерел. Більшість відомих курортів регіону
            побудовані саме навколо них.
          </p>
          <p>
            На цій ділянці є власний вихід підземної води з лікувальними
            властивостями. Це не просто бонус — це окрема цінність об&apos;єкта,
            яка вирізняє його з усього ринку комерційної нерухомості Закарпаття.
          </p>
          <div className={`${styles.callout} glass`} data-glow>
            <strong>Що це відкриває</strong>
            <span>
              Wellness-комплекс, мінібальнеологію, SPA-готель, оздоровчий ретрит
              або просто унікальну «фішку» для ресторану та бази відпочинку.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
