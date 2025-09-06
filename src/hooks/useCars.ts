import { useState, useEffect } from "react";
import { type Car } from "../types/Car";

// Конфигурация
const USE_MOCK = true; // Переключайте на false когда API будет готов
const API_URL = "https://your-api.com/cars";

const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mockCars: Car[] = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2022,
      price: 25000,
      color: "White",
      imageUrl: "https://a.d-cd.net/373f248s-960.jpg",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2021,
      price: 22000,
      color: "Blue",
      imageUrl:
        "https://i.pinimg.com/736x/37/83/de/3783de5ecaa7a6195f4c5e6fadc865df.jpg",
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      price: 35000,
      color: "Red",
      imageUrl:
        "https://avatars.mds.yandex.net/i?id=1f72d2e3514d2f143e62e4f27c7858a2_l-5250144-images-thumbs&n=13",
    },
  ];

  const fetchRealCars = async () => {
    try {
      setLoading(true); // Устанавливаем loading при начале запроса
      setError(null);

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Car[] = await response.json();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки данных");
    } finally {
      setLoading(false); // Всегда устанавливаем loading в false
    }
  };

  const fetchMockCars = () => {
    setLoading(true); // Устанавливаем loading при начале mock загрузки
    setError(null);

    setTimeout(() => {
      setCars(mockCars);
      setLoading(false); // Обязательно устанавливаем loading в false
    }, 1000);
  };

  useEffect(() => {
    if (USE_MOCK) {
      fetchMockCars();
    } else {
      fetchRealCars();
    }
  }, [USE_MOCK]); // Добавляем зависимость от USE_MOCK

  const refetch = () => {
    if (USE_MOCK) {
      fetchMockCars();
    } else {
      fetchRealCars();
    }
  };

  return { cars, loading, error, refetch };
};

export default useCars;
