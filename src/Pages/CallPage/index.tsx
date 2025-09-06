import React, { useState } from "react";
import useTaxiCalls from "../../hooks/useTaxiCalls";
import TaxiCallCard from "../../Components/CallCard";
import "./style.less";
import { exportTaxiCallsToExcelAdvanced } from "../../utils/exportToExcel";
const TaxiCallList: React.FC = () => {
  const { calls, loading, error, refetch } = useTaxiCalls();
  const [filter, setFilter] = useState<string>("all");

  const filteredCalls = calls.filter((call) => {
    if (filter === "all") return true;
    return call.status === filter;
  });

  const getStatusCounts = () => {
    const counts = {
      all: calls.length,
      pending: calls.filter((c) => c.status === "pending").length,
      accepted: calls.filter((c) => c.status === "accepted").length,
      completed: calls.filter((c) => c.status === "completed").length,
      cancelled: calls.filter((c) => c.status === "cancelled").length,
      no_answer: calls.filter((c) => c.status === "no_answer").length,
    };
    return counts;
  };

  const counts = getStatusCounts();

  const handleExport = () => {
    exportTaxiCallsToExcelAdvanced(filteredCalls, "вызовы_такси");
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
            onClick={handleExport}
            className="export-btn"
            title="Экспорт в Excel"
          >
            📊 Экспорт
          </button>
          <button onClick={refetch} className="refresh-btn">
            Обновить
          </button>
        </div>
      </div>

      <div className="taxi-call-filters">
        <button
          className={filter === "all" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          Все ({counts.all})
        </button>
        <button
          className={filter === "pending" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("pending")}
        >
          Ожидают ({counts.pending})
        </button>
        <button
          className={filter === "accepted" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("accepted")}
        >
          В пути ({counts.accepted})
        </button>
        <button
          className={
            filter === "completed" ? "filter-btn active" : "filter-btn"
          }
          onClick={() => setFilter("completed")}
        >
          Завершены ({counts.completed})
        </button>
        <button
          className={
            filter === "cancelled" ? "filter-btn active" : "filter-btn"
          }
          onClick={() => setFilter("cancelled")}
        >
          Отменены ({counts.cancelled})
        </button>
      </div>

      {filteredCalls.length === 0 ? (
        <div className="no-calls">
          {filter === "all"
            ? "Вызовы не найдены"
            : `Нет вызовов со статусом "${getStatusText(filter)}"`}
        </div>
      ) : (
        <div className="taxi-calls-list">
          {filteredCalls.map((call) => (
            <TaxiCallCard key={call.id} call={call} />
          ))}
        </div>
      )}
    </div>
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "ожидают";
    case "accepted":
      return "в пути";
    case "completed":
      return "завершены";
    case "cancelled":
      return "отменены";
    case "no_answer":
      return "нет ответа";
    default:
      return status;
  }
};

export default TaxiCallList;
