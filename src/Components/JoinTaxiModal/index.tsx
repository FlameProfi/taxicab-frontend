import React, { useState } from "react";
import "./style.less";

interface JoinTaxiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  experience: string;
  carModel: string;
  carYear: string;
  message: string;
}

const JoinTaxiModal: React.FC<JoinTaxiModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    experience: "",
    carModel: "",
    carYear: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      onClose();
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        experience: "",
        carModel: "",
        carYear: "",
        message: "",
      });
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      experience: "",
      carModel: "",
      carYear: "",
      message: "",
    });
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Подключиться к таксопарку</h2>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
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
              <label htmlFor="experience">Опыт вождения (лет) *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Выберите опыт</option>
                <option value="0-1">0-1 год</option>
                <option value="1-3">1-3 года</option>
                <option value="3-5">3-5 лет</option>
                <option value="5+">Более 5 лет</option>
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
              <button
                type="button"
                className="btn-secondary"
                onClick={handleClose}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinTaxiModal;
