import { useEffect, useState } from 'react'
import { type TaxiCall } from '../types/TaxiCall'
import { API_ENDPOINTS } from '../utils/apiConfig'

interface UseTaxiCallsResult {
  calls: TaxiCall[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createCall: (call: Omit<TaxiCall, 'id' | 'callTime' | 'createdAt' | 'updatedAt'>) => Promise<TaxiCall | null>;
  updateCall: (id: number, call: Partial<TaxiCall>) => Promise<TaxiCall | null>;
  updateCallStatus: (id: number, status: string, price?: number) => Promise<TaxiCall | null>;
  deleteCall: (id: number) => Promise<boolean>;
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

const useTaxiCalls = (): UseTaxiCallsResult => {
  const [calls, setCalls] = useState<TaxiCall[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINTS.taxiCalls, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json() as TaxiCall[];
      const sortedCalls = [...data].sort((a, b) => 
        new Date(b.callTime).getTime() - new Date(a.callTime).getTime()
      );
      setCalls(sortedCalls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const createCall = async (callData: Omit<TaxiCall, 'id' | 'callTime' | 'createdAt' | 'updatedAt'>): Promise<TaxiCall | null> => {
    try {
      const response = await fetch(API_ENDPOINTS.taxiCalls, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(callData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCall = await response.json() as TaxiCall;
      setCalls(prev => [newCall, ...prev]);
      return newCall;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании вызова');
      return null;
    }
  };

  const updateCall = async (id: number, callData: Partial<TaxiCall>): Promise<TaxiCall | null> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.taxiCalls}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(callData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCall = await response.json() as TaxiCall;
      setCalls(prev => prev.map(call => call.id === id ? updatedCall : call));
      return updatedCall;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении вызова');
      return null;
    }
  };

const updateCallStatus = async (id: number, status: string, price?: number): Promise<TaxiCall | null> => {
  try {
    const currentCall = calls.find(call => call.id === id);
    if (!currentCall) {
      throw new Error('Вызов не найден');
    }

    const updateData = {
      ...currentCall,
      status: status,
      ...(price !== undefined && { price: price })
    };

    const response = await fetch(`${API_ENDPOINTS.taxiCalls}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const updatedCall = await response.json() as TaxiCall;
    setCalls(prev => prev.map(call => call.id === id ? updatedCall : call));
    return updatedCall;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Ошибка при обновлении статуса вызова');
    return null;
  }
};

  const deleteCall = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.taxiCalls}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCalls(prev => prev.filter(call => call.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении вызова');
      return false;
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return { calls, loading, error, refetch: fetchCalls, createCall, updateCall, updateCallStatus, deleteCall };
};

export default useTaxiCalls;