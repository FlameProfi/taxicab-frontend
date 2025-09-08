import React, { useState } from 'react'
import useDriverApplications from '../../hooks/useDriverApplications'
import './style.less'

interface JoinTaxiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  drivingExperience: string;
  carModel: string;
  carYear: string;
  message: string;
}

const JoinTaxiModal: React.FC<JoinTaxiModalProps> = ({ isOpen, onClose }) => {
  const { createApplication } = useDriverApplications();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    drivingExperience: '',
    carModel: '',
    carYear: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    try {
      const applicationData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        drivingExperience: parseInt(formData.drivingExperience) || 0,
        carModel: formData.carModel || undefined,
        carYear: formData.carYear ? parseInt(formData.carYear) : undefined,
        message: formData.message
      };

      const result = await createApplication(applicationData);
      
      if (result) {
        setSubmitSuccess(true);
        setTimeout(() => {
          handleClose();
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      drivingExperience: '',
      carModel: '',
      carYear: '',
      message: ''
    });
    setSubmitSuccess(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Подключиться к таксопарку</h2>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>
        
        <div className="modal-body">
          {submitSuccess ? (
            <div className="success-message">
              <h3>✅ Заявка успешно отправлена!</h3>
              <p>Наши рекрутеры свяжутся с вами в ближайшее время.</p>
            </div>
          ) : (
            <>
              <p className="modal-description">
                Хотите стать частью самого непредсказуемого таксопарка страны? 
                Заполните форму ниже и наши рекрутеры свяжутся с вами!
              </p>
              
              <form onSubmit={handleSubmit} className="join-form">
                <div className="form-group">
                  <label htmlFor="fullName">ФИО *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Телефон *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="drivingExperience">Опыт вождения (лет) *</label>
                  <select
                    id="drivingExperience"
                    name="drivingExperience"
                    value={formData.drivingExperience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Выберите опыт</option>
                    <option value="0">0 лет</option>
                    <option value="1">1 год</option>
                    <option value="2">2 года</option>
                    <option value="3">3 года</option>
                    <option value="4">4 года</option>
                    <option value="5">5 лет</option>
                    <option value="6">Более 5 лет</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="carModel">Модель автомобиля</label>
                    <input
                      type="text"
                      id="carModel"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      placeholder="Toyota Camry"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="carYear">Год выпуска</label>
                    <input
                      type="number"
                      id="carYear"
                      name="carYear"
                      value={formData.carYear}
                      onChange={handleChange}
                      min="1990"
                      max={new Date().getFullYear()}
                      placeholder="2020"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Почему хотите к нам? *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Расскажите, почему хотите присоединиться к MynSchraffenner..."
                    rows={4}
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={handleClose}>
                    Отмена
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinTaxiModal;