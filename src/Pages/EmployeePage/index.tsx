import React from "react";
import useEmployees from "../../hooks/useEmployees";
import EmployeeCard from "../../Components/EmployeeCard";
import "./style.less";

const EmployeeList: React.FC = () => {
  const { employees, loading, error, refetch } = useEmployees();

  if (loading) {
    return (
      <div className="employee-list">
        <div className="loading">Загрузка сотрудников...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-list">
        <div className="error">
          <p>Ошибка: {error}</p>
          <button onClick={refetch}>Повторить попытку</button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-list">
      <div className="employee-list-header">
        <h2>Список сотрудников ({employees.length})</h2>
      </div>

      {employees.length === 0 ? (
        <div className="no-employees">Сотрудники не найдены</div>
      ) : (
        <div className="employees-grid">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
