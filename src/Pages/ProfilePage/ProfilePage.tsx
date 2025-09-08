import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import useEmployees from '../../hooks/useEmployees'
import './style.less'

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateEmployee } = useEmployees();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error'; text: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatedData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        };
        
        setMessage({ type: 'success', text: 'Профиль успешно обновлен!' });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при обновлении профиля' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Новые пароли не совпадают' });
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Пароль должен содержать минимум 6 символов' });
      setLoading(false);
      return;
    }

    try {
      setMessage({ type: 'success', text: 'Пароль успешно изменен!' });
      
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при изменении пароля' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Профиль пользователя</h1>
        <div className="user-info">
          <div className="user-avatar">
            <span>{user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}</span>
          </div>
          <div className="user-details">
            <h2>{user?.firstName} {user?.lastName}</h2>
            <p className="user-role">{user?.role}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            📄 Профиль
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔐 Безопасность
          </button>
          <button 
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            ⚙️ Настройки
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <h3>Основная информация</h3>
              <form onSubmit={handleSubmitProfile} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Имя</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Введите имя"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Фамилия</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Введите фамилию"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введите email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Введите телефон"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button" disabled={loading}>
                    {loading ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="security-tab">
              <h3>Изменение пароля</h3>
              <form onSubmit={handleSubmitPassword} className="security-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Текущий пароль</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Введите текущий пароль"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">Новый пароль</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Введите новый пароль"
                  />
                  <small className="password-hint">
                    Пароль должен содержать минимум 6 символов
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Повторите новый пароль"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button" disabled={loading}>
                    {loading ? 'Изменение...' : 'Изменить пароль'}
                  </button>
                </div>
              </form>

              <div className="security-actions">
                <h4>Дополнительные действия</h4>
                <button className="logout-button" onClick={handleLogout}>
                  🚪 Выйти из аккаунта
                </button>
                <button className="danger-button">
                  🗑️ Удалить аккаунт
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-tab">
              <h3>Настройки приложения</h3>
              
              <div className="preference-group">
                <h4>Интерфейс</h4>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <span className="preference-label">Темная тема</span>
                </div>
                
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <span className="preference-label">Компактный режим</span>
                </div>
              </div>

              <div className="preference-group">
                <h4>Уведомления</h4>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <span className="preference-label">Email уведомления</span>
                </div>
                
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  <span className="preference-label">Push уведомления</span>
                </div>
              </div>

              <div className="preference-group">
                <h4>Язык</h4>
                <div className="form-group">
                  <select defaultValue="ru">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button className="save-button">
                  Сохранить настройки
                </button>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;