import React from "react";
import { type Employee } from "../../types/Employee";
import { generateAvatarSVG } from "../../utils/avatarGenerator";
import "./style.less";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  };

  const avatarSrc =
    employee.imageUrl ||
    generateAvatarSVG(employee.firstName, employee.lastName);

  return (
    <div className="employee-card">
      <div className="employee-header">
        <img
          src={avatarSrc}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="employee-avatar"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #555",
          }}
        />
        <div className="employee-basic-info">
          <h3>
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="employee-position">{employee.position}</p>
        </div>
      </div>

      <div className="employee-details">
        <div className="detail-item">
          <span className="detail-label">Отдел:</span>
          <span className="detail-value">{employee.department}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{employee.email}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Телефон:</span>
          <span className="detail-value">{employee.phone}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Зарплата:</span>
          <span className="detail-value">
            {employee.salary.toLocaleString()} ₽
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Дата приема:</span>
          <span className="detail-value">{formatDate(employee.hireDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
