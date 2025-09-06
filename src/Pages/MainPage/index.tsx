import React from "react";
import "./style.less";
import banner from "../AboutPage/banner.png";
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Таксопарк “МайнШкафнер”</h1>
          <p className="hero-description">
            Внимание! Если твоя жизнь кажется тебе недостаточно захватывающей и
            предсказуемой, добро пожаловать в чудесный мир сумасшедших
            перемещений с такси MynSchraffenner!
          </p>
        </div>
      </div>

      <div className="content-section">
        <div className="content-container">
          <div className="text-content">
            <p className="content-text">
              У нас особая гордость — это <strong>стиль вождения</strong>,
              проверенный временем и нервами пассажиров. Твоего личного героя
              ждет уникальная возможность почувствовать себя участником сериала
              «Игры на выживание». Водители нашей службы мечтают стать новыми{" "}
              <strong>Дарт Вейдерами дорог</strong>, так что держись крепче и
              помолись богам асфальта.
            </p>

            <p className="content-text">
              Машины здесь настоящие <strong>произведения искусства</strong>.
              Каждое утро наши механики собирают автомобиль заново из запчастей,
              найденных на свалке автомобилей NASA. Так что приветствуем тебя в
              машине будущего, способной легко пройти сквозь пробку, стену и
              пространство-время сразу.
            </p>

            <p className="content-text">
              И да, забавно слышать истории выживших пассажиров, особенно
              рассказы тех, кому посчастливилось увидеть собственные ноги вне
              салона автомобиля во время крутых поворотов.
            </p>

            <p className="content-text highlight">
              <strong>MynSchraffenner</strong> — единственное такси, где
              стоимость проезда измеряется количеством оставшихся нервных клеток
              пассажира. Убедитесь лично, что ваша обычная поездка станет
              настоящим приключением на грани жизни и смерти. Мы обещаем, что
              однажды вспоминать этот опыт будет весело... возможно.
            </p>

            <p className="content-text signature">
              Ах да, маленький совет напоследок: лучше заказывать трансфер
              заранее, чтобы успеть попрощаться с близкими перед поездкой.{" "}
              <strong>Добро пожаловать в клуб экстремалов!</strong>
            </p>
          </div>

          <div className="image-content">
            <div className="image-placeholder">
              <img
                src={banner}
                alt="Таксопарк МайнШкафнер"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Готовы к приключению?</h2>
          <p className="cta-text">
            Закажите такси и испытайте экстремальное вождение уже сегодня!
          </p>
          <button className="cta-button">🚖 Заказать такси</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
