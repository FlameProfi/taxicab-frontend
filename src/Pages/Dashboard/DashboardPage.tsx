import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import useCars from '../../hooks/useCars'
import useDriverApplications from '../../hooks/useDriverApplications'
import useEmployees from '../../hooks/useEmployees'
import useTaxiCalls from '../../hooks/useTaxiCalls'
import './style.less'

interface ApplicationStats {
  Total: number;
  Pending: number;
  Approved: number;
  Rejected: number;
}

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { cars, loading: carsLoading } = useCars();
  const { employees, loading: employeesLoading } = useEmployees();
  const { calls, loading: callsLoading } = useTaxiCalls();
  const { applications, loading: appsLoading, getStats } = useDriverApplications();
  
  const [appStats, setAppStats] = useState<ApplicationStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const stats = await getStats();
        if (stats) {
          setAppStats(stats as ApplicationStats);
        }
      } catch (error) {
        console.error('Ошибка при получении статистики:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const stats = {
    totalCars: cars.length,
    totalEmployees: employees.length,
    totalCalls: calls.length,
    completedCalls: calls.filter(c => c.status === 'completed').length,
    pendingCalls: calls.filter(c => c.status === 'pending').length,
    recentCalls: calls.slice(0, 5), 
    totalApplications: applications.length,
    pendingApplications: appStats?.Pending || 0,
    approvedApplications: appStats?.Approved || 0,
    rejectedApplications: appStats?.Rejected || 0
  };

  const getCallStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'cancelled': return 'status-cancelled';
      case 'no_answer': return 'status-no-answer';
      default: return '';
    }
  };

  const getCallStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'pending': return 'Ожидает';
      case 'accepted': return 'Принят';
      case 'cancelled': return 'Отменен';
      case 'no_answer': return 'Нет ответа';
      default: return status;
    }
  };

  if (authLoading) {
    return (
      <div className="dashboard-page">
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner spinner-large"></div>
            <p>Загрузка данных пользователя...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Панель управления</h1>
        {user ? (
					<p>
						Добро пожаловать, 
						{user.firstName && user.lastName 
							? ` ${user.firstName} ${user.lastName}` 
							: ` ${user.username}`}
						!
					</p>
				) : (
					<p>Добро пожаловать!</p>
				)}
        {process.env.NODE_ENV === 'development' && user && (
          <div style={{ fontSize: '12px', color: '#777', marginTop: '10px' }}>
            User ID: {user.id}, Username: {user.username}
          </div>
        )}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon cars">🚗</div>
          <div className="stat-info">
            <h3>Автомобили</h3>
            <p className="stat-number">{carsLoading ? '...' : stats.totalCars}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon employees">👥</div>
          <div className="stat-info">
            <h3>Сотрудники</h3>
            <p className="stat-number">{employeesLoading ? '...' : stats.totalEmployees}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon calls">📞</div>
          <div className="stat-info">
            <h3>Вызовы</h3>
            <p className="stat-number">{callsLoading ? '...' : stats.totalCalls}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon applications">📝</div>
          <div className="stat-info">
            <h3>Заявки</h3>
            <p className="stat-number">{appsLoading || loadingStats ? '...' : stats.totalApplications}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-metrics">
        <div className="metrics-section">
          <h2>📊 Статус вызовов</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Завершено</h3>
              <p className="metric-value success">{stats.completedCalls}</p>
            </div>
            <div className="metric-card">
              <h3>Ожидают</h3>
              <p className="metric-value warning">{stats.pendingCalls}</p>
            </div>
            <div className="metric-card">
              <h3>Всего</h3>
              <p className="metric-value">{stats.totalCalls}</p>
            </div>
          </div>
        </div>

        <div className="metrics-section">
          <h2>📋 Статус заявок</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Ожидают</h3>
              <p className="metric-value warning">
                {loadingStats ? '...' : stats.pendingApplications}
              </p>
            </div>
            <div className="metric-card">
              <h3>Одобрены</h3>
              <p className="metric-value success">
                {loadingStats ? '...' : stats.approvedApplications}
              </p>
            </div>
            <div className="metric-card">
              <h3>Отклонены</h3>
              <p className="metric-value danger">
                {loadingStats ? '...' : stats.rejectedApplications}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>🕐 Последние вызовы</h2>
        {callsLoading ? (
          <div className="loading-placeholder">Загрузка вызовов...</div>
        ) : (
          <div className="recent-calls">
            {stats.recentCalls.length === 0 ? (
              <div className="no-data">Нет данных</div>
            ) : (
              stats.recentCalls.map(call => (
                <div key={call.id} className="call-item">
                  <div className="call-info">
                    <h4>{call.clientName}</h4>
                    <p className="call-phone">{call.clientPhone}</p>
                  </div>
                  <div className="call-details">
                    <span className={`call-status ${getCallStatusClass(call.status)}`}>
                      {getCallStatusText(call.status)}
                    </span>
                    <p className="call-time">
                      {new Date(call.callTime).toLocaleTimeString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;