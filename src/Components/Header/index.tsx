import { useState } from "react"
import { NavLink } from "react-router-dom"
import JoinTaxiModal from "../JoinTaxiModal"
import "./style.less"
function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    console.log("Форма отправлена:", data);
    alert(
      "Заявка успешно отправлена! Наши рекрутеры свяжутся с вами в ближайшее время."
    );
  };
  return (
    <>
      <div className="container">
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Таксопарк "МайнШкафнер"
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Отдел кадров
          </NavLink>
          <NavLink
            to="/autopark"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Автопарк
          </NavLink>
          <NavLink
            to="/calls"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Список вызовов
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            О нас
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Профиль
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Статистика
          </NavLink>
        </nav>
        <button className="join-button" onClick={openModal}>
          Подключиться
        </button>
        <JoinTaxiModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default Header;
