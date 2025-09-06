import { useState, useEffect } from "react";
import { type Employee } from "../types/Employee";

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock данные сотрудников
  const mockEmployees: Employee[] = [
    {
      id: 1,
      firstName: "Иван",
      lastName: "Петров",
      position: "Менеджер по продажам",
      department: "Отдел продаж",
      email: "ivan.petrov@company.com",
      phone: "+7 (999) 123-45-67",
      salary: 65000,
      hireDate: "2022-03-15",
    },
    {
      id: 2,
      firstName: "Мария",
      lastName: "Сидорова",
      position: "Финансовый аналитик",
      department: "Финансовый отдел",
      email: "maria.sidorova@company.com",
      phone: "+7 (999) 234-56-78",
      salary: 75000,
      hireDate: "2021-07-20",
    },
    {
      id: 3,
      firstName: "Алексей",
      lastName: "Козлов",
      position: "Технический специалист",
      department: "Сервисный отдел",
      email: "alexey.kozlov@company.com",
      phone: "+7 (999) 345-67-89",
      salary: 55000,
      hireDate: "2023-01-10",
    },
    {
      id: 4,
      firstName: "Елена",
      lastName: "Волкова",
      position: "HR-менеджер",
      department: "Отдел кадров",
      email: "elena.volkova@company.com",
      phone: "+7 (999) 456-78-90",
      salary: 60000,
      hireDate: "2022-11-05",
    },
  ];

  useEffect(() => {
    // Симуляция загрузки данных
    const timer = setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 500);
  };

  return { employees, loading, error, refetch };
};

export default useEmployees;
