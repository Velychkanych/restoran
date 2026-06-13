import Reveal from "@/components/effects/Reveal";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.glow} aria-hidden="true" />
      <Reveal className={styles.inner}>
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          Контакти
        </div>
        <h2 className="sec-title" style={{ margin: "0 auto 1.5rem" }}>
          Покажу <em>особисто</em>.
        </h2>
        <p className={styles.lead}>
          Покажу об&apos;єкт особисто — будівлю, територію, ставок і вихід
          джерела. Надам повний пакет документів та додаткові фото на запит.
        </p>
        <a href="tel:+380680924002" className={styles.phone}>
          +380 68 092 40 02
        </a>
        <div className={styles.name}>Юрій Величканич · власник</div>
        <div className={styles.buttons}>
          <a
            href="https://wa.me/380680924002"
            className="btn btn-copper"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href="viber://chat?number=%2B380680924002"
            className="btn btn-ghost"
          >
            Viber
          </a>
          <a
            href="https://t.me/velychkanych"
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          <a
            href="mailto:velychkanych0202@gmail.com"
            className="btn btn-ghost"
          >
            Email
          </a>
        </div>
      </Reveal>
    </section>
  );
}
