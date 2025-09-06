import React from "react";
import { type TaxiCall } from "../../types/TaxiCall";
import "./style.less";

interface TaxiCallCardProps {
  call: TaxiCall;
}

const TaxiCallCard: React.FC<TaxiCallCardProps> = ({ call }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    const diffInHours = diffInMinutes / 60;

    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} мин назад`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ч назад`;
    } else {
      return date.toLocaleDateString("ru-RU");
    }
  };

  const getStatusIcon = () => {
    switch (call.status) {
      case "pending":
        return "⏳";
      case "accepted":
        return "🚕";
      case "completed":
        return "✅";
      case "cancelled":
        return "❌";
      case "no_answer":
        return "⏰";
      default:
        return "📞";
    }
  };

  const getStatusText = () => {
    switch (call.status) {
      case "pending":
        return "Ожидает";
      case "accepted":
        return "Принят";
      case "completed":
        return "Завершен";
      case "cancelled":
        return "Отменен";
      case "no_answer":
        return "Нет ответа";
      default:
        return "Неизвестно";
    }
  };

  const getStatusClass = () => {
    switch (call.status) {
      case "pending":
        return "status-pending";
      case "accepted":
        return "status-accepted";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      case "no_answer":
        return "status-no-answer";
      default:
        return "";
    }
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className={`taxi-call-card ${getStatusClass()}`}>
      <div className="call-header">
        <div className="client-info">
          <div className="client-name">{call.clientName}</div>
          <div className="client-phone">{call.clientPhone}</div>
        </div>
        <div className="call-meta">
          <div className="call-time">{formatTime(call.callTime)}</div>
          <div className="call-status">
            <span className="status-icon">{getStatusIcon()}</span>
            <span className="status-text">{getStatusText()}</span>
          </div>
        </div>
      </div>

      <div className="addresses">
        <div className="address-item pickup">
          <span className="address-label">Откуда:</span>
          <span className="address-value">{call.pickupAddress}</span>
        </div>
        <div className="address-item destination">
          <span className="address-label">Куда:</span>
          <span className="address-value">{call.destinationAddress}</span>
        </div>
      </div>

      {call.driverName && (
        <div className="driver-info">
          <div className="driver-name">Водитель: {call.driverName}</div>
          {call.carModel && call.carNumber && (
            <div className="car-info">
              {call.carModel} ({call.carNumber})
            </div>
          )}
        </div>
      )}

      <div className="call-details">
        {(call.price || call.duration || call.distance) && (
          <div className="trip-info">
            {call.price && <span className="price">💰 {call.price} ₽</span>}
            {call.duration && (
              <span className="duration">⏱ {call.duration} мин</span>
            )}
            {call.distance && (
              <span className="distance">📏 {call.distance} км</span>
            )}
          </div>
        )}

        {call.rating && (
          <div className="rating">
            <span className="rating-label">Рейтинг:</span>
            <span className="rating-stars">{renderStars(call.rating)}</span>
            <span className="rating-value">({call.rating})</span>
          </div>
        )}

        {call.notes && (
          <div className="call-notes">
            <span className="notes-label">Заметки:</span>
            <span className="notes-value">{call.notes}</span>
          </div>
        )}
      </div>

      <div className="call-actions">
        <button className="call-action-btn call-btn">📞 Позвонить</button>
        {call.status === "pending" && (
          <button className="call-action-btn accept-btn">✅ Принять</button>
        )}
        {(call.status === "pending" || call.status === "accepted") && (
          <button className="call-action-btn cancel-btn">❌ Отменить</button>
        )}
      </div>
    </div>
  );
};

export default TaxiCallCard;
