import { useEffect, useState } from 'react'
import { type DriverApplication } from '../types/DriverApplication'
import { API_ENDPOINTS } from '../utils/apiConfig'

interface UseDriverApplicationsResult {
  applications: DriverApplication[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createApplication: (application: Omit<DriverApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<DriverApplication | null>;
  updateApplicationStatus: (id: number, status: string) => Promise<DriverApplication | null>;
  deleteApplication: (id: number) => Promise<boolean>;
  getStats: () => Promise<unknown>;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const useDriverApplications = (): UseDriverApplicationsResult => {
  const [applications, setApplications] = useState<DriverApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINTS.driverApplications, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as DriverApplication[];
      const sortedApplications = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setApplications(sortedApplications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async (applicationData: Omit<DriverApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<DriverApplication | null> => {
    try {
      const response = await fetch(API_ENDPOINTS.driverApplications, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newApplication = await response.json() as DriverApplication;
      setApplications(prev => [newApplication, ...prev]);
      return newApplication;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании заявки');
      return null;
    }
  };

  const updateApplicationStatus = async (id: number, status: string): Promise<DriverApplication | null> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.driverApplications}/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const updatedApplication = result.application as DriverApplication;
      
      setApplications(prev => prev.map(app => app.id === id ? updatedApplication : app));
      return updatedApplication;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении статуса заявки');
      return null;
    }
  };

  const deleteApplication = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.driverApplications}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setApplications(prev => prev.filter(app => app.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении заявки');
      return false;
    }
  };

  const getStats = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.driverApplications}/stats`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при получении статистики');
      return null;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { 
    applications, 
    loading, 
    error, 
    refetch: fetchApplications, 
    createApplication, 
    updateApplicationStatus, 
    deleteApplication, 
    getStats 
  };
};

export default useDriverApplications;