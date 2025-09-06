import React from "react";
import "./style.less";
import banner from "./banner.png";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">О нас</h1>

          <div className="about-section">
            <p className="about-text">
              Приветствуем вас в самом <strong>непредсказуемом</strong>{" "}
              таксопарке страны!
              <strong> MynSchraffenner</strong> – это не просто перевозки, это
              экстремальный аттракцион на колесах, где каждая поездка – это
              вызов судьбе, проверка нервов и незабываемые впечатления.
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">Наша философия</h2>
            <p className="about-text">
              Мы не возим пассажиров – мы создаем <strong>легенды</strong>. Наши
              водители – не просто профессионалы, а настоящие джедаи асфальта,
              прошедшие жесткий отбор: если они могут доставить вас из точки А в
              точку Б, не задев ни одного закона физики (хотя бы визуально), –
              они работают у нас.
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">Наш автопарк</h2>
            <p className="about-text">
              Наши автомобили – это не просто машины, а{" "}
              <strong>шедевры инженерной мысли</strong>, собранные из лучших
              деталей, которые удалось найти… ну, где придется. Каждый день –
              новый эксперимент: то ли кузов держится на честном слове, то ли
              двигатель работает на чистой силе воли. Но одно мы гарантируем –{" "}
              <strong>скучно не будет!</strong>
            </p>
          </div>

          <div className="about-section">
            <h2 className="section-title">Почему выбирают нас?</h2>
            <ul className="benefits-list">
              <li>
                <strong>Адреналин в подарок</strong> – средняя поездка у нас
                сравнима с парком аттракционов.
              </li>
              <li>
                <strong>Непредсказуемость</strong> – никогда не знаешь, приедешь
                ли ты быстрее навигатора или быстрее собственного крика.
              </li>
              <li>
                <strong>Эксклюзивные эмоции</strong> – от восторга до
                просветления за одну поездку.
              </li>
              <li>
                <strong>
                  Ценник, который зависит от вашей стрессоустойчивости
                </strong>{" "}
                (шутка… или нет).
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2 className="section-title">Наша миссия</h2>
            <p className="about-text">
              Мы не просто такси – мы <strong>агенты хаоса</strong> в мире
              скучных перевозок. Наша цель – доказать, что дорога может быть{" "}
              <strong>круче, чем пункт назначения</strong>.
            </p>
            <p className="about-text highlight">
              Готовы испытать себя? Заказывайте поездку в MynSchraffenner – и
              помните:
              <strong>
                {" "}
                страховать жизнь перед вызовом такси – это не паранойя, это
                разумная предосторожность.
              </strong>
            </p>
            <p className="about-text signature">
              🚖💨
              <br />
              P.S. Родственникам выживших пассажиров – скидка 10% на следующую
              поездку!
            </p>
          </div>
        </div>

        <div className="about-image">
          <div className="image-placeholder">
            <img
              src={banner}
              alt="MynSchraffenner такси"
              className="about-photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
