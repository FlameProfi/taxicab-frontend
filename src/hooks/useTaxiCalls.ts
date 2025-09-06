import { useState, useEffect } from "react";
import { type TaxiCall } from "../types/TaxiCall";

const useTaxiCalls = () => {
  const [calls, setCalls] = useState<TaxiCall[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock данные вызовов такси
  const mockCalls: TaxiCall[] = [
    {
      id: 1,
      clientName: "Анна Иванова",
      clientPhone: "+7 (999) 123-45-67",
      callTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      pickupAddress: "ул. Ленина, 25",
      destinationAddress: "пр. Победы, 10",
      status: "completed",
      driverName: "Иван Петров",
      carModel: "Toyota Camry",
      carNumber: "А123БВ777",
      price: 350,
      duration: 25,
      distance: 12.5,
      rating: 5,
      notes: "Клиент с ребенком, нужна детская автокресло",
    },
    {
      id: 2,
      clientName: "Михаил Сидоров",
      clientPhone: "+7 (999) 234-56-78",
      callTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      pickupAddress: "ул. Гагарина, 15",
      destinationAddress: "аэропорт Домодедово",
      status: "accepted",
      driverName: "Алексей Козлов",
      carModel: "Honda Civic",
      carNumber: "В456ГД123",
      notes: "Срочно! Опаздывает на рейс",
    },
    {
      id: 3,
      clientName: "Екатерина Волкова",
      clientPhone: "+7 (999) 345-67-89",
      callTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      pickupAddress: 'ТЦ "Европа", пр. Мира, 50',
      destinationAddress: "ул. Советская, 8",
      status: "pending",
      notes: "Ждет у выхода из магазина",
    },
    {
      id: 4,
      clientName: "Дмитрий Морозов",
      clientPhone: "+7 (999) 456-78-90",
      callTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      pickupAddress: "ул. Пушкина, 30",
      destinationAddress: 'гостиница "Россия"',
      status: "cancelled",
      notes: "Отменил вызов",
    },
    {
      id: 5,
      clientName: "Ольга Петрова",
      clientPhone: "+7 (999) 567-89-01",
      callTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      pickupAddress: "Ж/д вокзал",
      destinationAddress: "ул. Садовая, 12",
      status: "completed",
      driverName: "Сергей Новиков",
      carModel: "Ford Focus",
      carNumber: "Е789ЖЗ456",
      price: 280,
      duration: 18,
      distance: 8.2,
      rating: 4,
      notes: "Оставил зонт в такси",
    },
    {
      id: 6,
      clientName: "Александр Кузнецов",
      clientPhone: "+7 (999) 678-90-12",
      callTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      pickupAddress: "ул. Новая, 45",
      destinationAddress: 'ТРЦ "Глобус"',
      status: "no_answer",
      notes: "Не отвечает на звонки",
    },
  ];

  useEffect(() => {
    // Симуляция загрузки данных
    const timer = setTimeout(() => {
      // Сортируем по времени (новые первыми)
      const sortedCalls = [...mockCalls].sort(
        (a, b) =>
          new Date(b.callTime).getTime() - new Date(a.callTime).getTime()
      );
      setCalls(sortedCalls);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      const sortedCalls = [...mockCalls].sort(
        (a, b) =>
          new Date(b.callTime).getTime() - new Date(a.callTime).getTime()
      );
      setCalls(sortedCalls);
      setLoading(false);
    }, 500);
  };

  return { calls, loading, error, refetch };
};

export default useTaxiCalls;
