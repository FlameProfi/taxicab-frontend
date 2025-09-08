import React, { useState } from 'react'
import TaxiCallCard from '../../Components/CallCard'
import useTaxiCalls from '../../hooks/useTaxiCalls'
import './style.less'

const TaxiCallList: React.FC = () => {
  const { calls, loading, error, refetch, updateCallStatus, createCall } = useTaxiCalls();
  const [filter, setFilter] = useState<string>('all');
  const [generating, setGenerating] = useState(false);

  const filteredCalls = calls.filter(call => {
    if (filter === 'all') return true;
    return call.status === filter;
  });

  const getStatusCounts = () => {
    const counts = {
      all: calls.length,
      pending: calls.filter(c => c.status === 'pending').length,
      accepted: calls.filter(c => c.status === 'accepted').length,
      completed: calls.filter(c => c.status === 'completed').length,
      cancelled: calls.filter(c => c.status === 'cancelled').length,
      no_answer: calls.filter(c => c.status === 'no_answer').length
    };
    return counts;
  };

  const counts = getStatusCounts();

  const generateRandomCall = async () => {
    setGenerating(true);
    
    try {
      const clientNames = [
        'Анна Иванова', 'Михаил Сидоров', 'Екатерина Волкова', 'Дмитрий Морозов',
        'Ольга Петрова', 'Александр Кузнецов', 'Мария Смирнова', 'Сергей Попов',
        'Ирина Васильева', 'Андрей Новиков', 'Елена Михайлова', 'Владимир Федоров'
      ];
      
      const phones = [
        '+79991234567', '+79992345678', '+79993456789', '+79994567890',
        '+79995678901', '+79996789012', '+79997890123', '+79998901234'
      ];
      
      const addresses = [
        'ул. Ленина, 25', 'пр. Победы, 10', 'ул. Гагарина, 15', 'аэропорт Домодедово',
        'ТЦ "Европа", пр. Мира, 50', 'ул. Пушкина, 30', 'Ж/д вокзал', 'ул. Советская, 8',
        'ТРЦ "Глобус"', 'ул. Новая, 45', 'пр. Мира, 100', 'ул. Центральная, 5'
      ];
      
      const drivers = [
        'Иван Петров', 'Алексей Козлов', 'Сергей Новиков', 'Михаил Смирнов',
        'Дмитрий Васильев', 'Андрей Попов', 'Владимир Михайлов'
      ];
      
      const cars = [
        'Toyota Camry', 'Honda Civic', 'Ford Focus', 'Volkswagen Passat',
        'BMW X5', 'Mercedes C-Class', 'Audi A4', 'Nissan Teana'
      ];
      
      const carNumbers = [
        'А123БВ777', 'В456ГД123', 'Е789ЖЗ456', 'И321КЛ987',
        'М654НП321', 'О987РС654', 'Т321УФ987', 'Х654ЧШ321'
      ];

      const randomClientName = clientNames[Math.floor(Math.random() * clientNames.length)];
      const randomPhone = phones[Math.floor(Math.random() * phones.length)];
      const randomPickup = addresses[Math.floor(Math.random() * addresses.length)];
      const randomDestination = addresses[Math.floor(Math.random() * addresses.length)];
      
      const statuses = ['pending', 'pending', 'pending', 'accepted', 'completed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const callData = {
        clientName: randomClientName,
        clientPhone: randomPhone,
        pickupAddress: randomPickup,
        destinationAddress: randomDestination,
        status: randomStatus,
        callTime: new Date().toISOString(),
        ...(randomStatus !== 'pending' && {
          driverName: drivers[Math.floor(Math.random() * drivers.length)],
          carModel: cars[Math.floor(Math.random() * cars.length)],
          carNumber: carNumbers[Math.floor(Math.random() * carNumbers.length)],
          price: Math.floor(Math.random() * 1000) + 200, 
          duration: Math.floor(Math.random() * 60) + 5,
          distance: parseFloat((Math.random() * 30 + 2).toFixed(1)) 
        })
      };

      await createCall(callData);
    } catch (error) {
      console.error('Ошибка при генерации вызова:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="taxi-call-list">
        <div className="loading">Загрузка вызовов такси...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="taxi-call-list">
        <div className="error">
          <p>Ошибка: {error}</p>
          <button onClick={refetch}>Повторить попытку</button>
        </div>
      </div>
    );
  }

  return (
    <div className="taxi-call-list">
      <div className="taxi-call-list-header">
        <h2>Вызовы такси ({filteredCalls.length})</h2>
        <div className="header-actions">
          <button 
            onClick={generateRandomCall} 
            className="generate-btn" 
            disabled={generating}
            title="Сгенерировать случайный вызов"
          >
            {generating ? 'Генерация...' : '🎲 Сгенерировать вызов'}
          </button>
          <button onClick={refetch} className="refresh-btn">
            Обновить
          </button>
        </div>
      </div>
      
      <div className="taxi-call-filters">
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          Все ({counts.all})
        </button>
        <button 
          className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('pending')}
        >
          Ожидают ({counts.pending})
        </button>
        <button 
          className={filter === 'accepted' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('accepted')}
        >
          В пути ({counts.accepted})
        </button>
        <button 
          className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('completed')}
        >
          Завершены ({counts.completed})
        </button>
        <button 
          className={filter === 'cancelled' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('cancelled')}
        >
          Отменены ({counts.cancelled})
        </button>
      </div>
      
      {filteredCalls.length === 0 ? (
        <div className="no-calls">
          {filter === 'all' ? 'Вызовы не найдены' : `Нет вызовов со статусом "${getStatusText(filter)}"`}
        </div>
      ) : (
        <div className="taxi-calls-list">
          {filteredCalls.map((call) => (
            <TaxiCallCard 
              key={call.id} 
              call={call} 
              onUpdateStatus={updateCallStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'ожидают';
    case 'accepted': return 'в пути';
    case 'completed': return 'завершены';
    case 'cancelled': return 'отменены';
    case 'no_answer': return 'нет ответа';
    default: return status;
  }
};

export default TaxiCallList;