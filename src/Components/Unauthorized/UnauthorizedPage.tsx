import React from 'react'
import { Link } from 'react-router-dom'
import './style.less'

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <h1>🚫 Доступ запрещен</h1>
        <p>У вас нет прав для просмотра этой страницы.</p>
        <div className="unauthorized-actions">
          <Link to="/login" className="login-link">
            Войти как другой пользователь
          </Link>
          <Link to="/" className="home-link">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;