import React from "react";
import type { Car } from "../../types/Car";
import "./style.less";
interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="car-card">
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="car-image"
        />
      )}
      <div className="car-info">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>
          <strong>Год:</strong> {car.year}
        </p>
        <p>
          <strong>Цена:</strong> ${car.price.toLocaleString()}
        </p>
        <p>
          <strong>Цвет:</strong> {car.color}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
