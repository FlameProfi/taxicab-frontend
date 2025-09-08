import { useEffect, useState } from 'react'
import { type Employee } from '../types/Employee'
import { API_ENDPOINTS } from '../utils/apiConfig'

interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Employee | null>;
  updateEmployee: (id: number, employee: Partial<Employee>) => Promise<Employee | null>;
  deleteEmployee: (id: number) => Promise<boolean>;
}

const useEmployees = (): UseEmployeesResult => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINTS.employees);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as Employee[];
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee | null> => {
    try {
      const response = await fetch(API_ENDPOINTS.employees, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newEmployee = await response.json() as Employee;
      setEmployees(prev => [newEmployee, ...prev]);
      return newEmployee;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании сотрудника');
      return null;
    }
  };

  const updateEmployee = async (id: number, employeeData: Partial<Employee>): Promise<Employee | null> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.employees}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedEmployee = await response.json() as Employee;
      setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
      return updatedEmployee;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении сотрудника');
      return null;
    }
  };

  const deleteEmployee = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.employees}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEmployees(prev => prev.filter(emp => emp.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении сотрудника');
      return false;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, refetch: fetchEmployees, createEmployee, updateEmployee, deleteEmployee };
};

export default useEmployees;