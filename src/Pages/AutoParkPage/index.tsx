import React from "react";
import "./style.less";
import useCars from "../../hooks/useCars";
import CarCard from "../../Components/CarCard/index";

const AutoParkPage: React.FC = () => {
  const { cars, loading, error, refetch } = useCars();

  if (loading) {
    return (
      <div className="car-list">
        <div className="loading">Загрузка автомобилей...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-list">
        <div className="error">
          <p>Ошибка: {error}</p>
          <button onClick={refetch}>Повторить попытку</button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-list">
      <div className="car-list-header">
        <h2>Каталог автомобилей ({cars.length})</h2>
      </div>

      {cars.length === 0 ? (
        <div className="no-cars">Автомобили не найдены</div>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoParkPage;
