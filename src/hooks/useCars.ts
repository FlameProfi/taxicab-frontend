import { useEffect, useState } from 'react'
import { type Car } from '../types/Car'
import { API_ENDPOINTS } from '../utils/apiConfig'

interface UseCarsResult {
  cars: Car[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createCar: (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Car | null>;
  updateCar: (id: number, car: Partial<Car>) => Promise<Car | null>;
  deleteCar: (id: number) => Promise<boolean>;
}

const useCars = (): UseCarsResult => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINTS.cars);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Car[] = await response.json();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const createCar = async (carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car | null> => {
    try {
      const response = await fetch(API_ENDPOINTS.cars, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCar: Car = await response.json();
      setCars(prev => [newCar, ...prev]);
      return newCar;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании автомобиля');
      return null;
    }
  };

  const updateCar = async (id: number, carData: Partial<Car>): Promise<Car | null> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.cars}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCar: Car = await response.json();
      setCars(prev => prev.map(car => car.id === id ? updatedCar : car));
      return updatedCar;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении автомобиля');
      return null;
    }
  };

  const deleteCar = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.cars}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCars(prev => prev.filter(car => car.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении автомобиля');
      return false;
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, loading, error, refetch: fetchCars, createCar, updateCar, deleteCar };
};

export default useCars;