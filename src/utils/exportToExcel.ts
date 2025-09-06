import * as XLSX from "xlsx";
import { type TaxiCall } from "../types/TaxiCall";

export const exportTaxiCallsToExcelAdvanced = (
  calls: TaxiCall[],
  filename: string = "вызовы_такси"
) => {
  // Основные данные
  const mainData = calls.map((call) => ({
    ID: call.id,
    Клиент: call.clientName,
    Телефон: call.clientPhone,
    "Дата вызова": new Date(call.callTime).toLocaleDateString("ru-RU"),
    "Время вызова": new Date(call.callTime).toLocaleTimeString("ru-RU"),
    Откуда: call.pickupAddress,
    Куда: call.destinationAddress,
    Статус: getStatusText(call.status),
    Водитель: call.driverName || "-",
    Авто: call.carModel ? `${call.carModel} (${call.carNumber})` : "-",
    "Цена (₽)": call.price || 0,
    "Длительность (мин)": call.duration || 0,
    "Расстояние (км)": call.distance || 0,
    Рейтинг: call.rating || "-",
    Заметки: call.notes || "-",
  }));

  // Статистика
  const stats = {
    "Всего вызовов": calls.length,
    Завершено: calls.filter((c) => c.status === "completed").length,
    Отменено: calls.filter((c) => c.status === "cancelled").length,
    Ожидает: calls.filter((c) => c.status === "pending").length,
    "В пути": calls.filter((c) => c.status === "accepted").length,
    "Нет ответа": calls.filter((c) => c.status === "no_answer").length,
    "Общая выручка (₽)": calls
      .filter((c) => c.price)
      .reduce((sum, call) => sum + (call.price || 0), 0),
    "Средняя цена (₽)":
      Math.round(
        calls
          .filter((c) => c.price)
          .reduce((sum, call) => sum + (call.price || 0), 0) /
          calls.filter((c) => c.price).length
      ) || 0,
  };

  const workbook = XLSX.utils.book_new();

  // Основной лист
  const mainWorksheet = XLSX.utils.json_to_sheet(mainData);
  mainWorksheet["!cols"] = [
    { wch: 8 }, // ID
    { wch: 20 }, // Клиент
    { wch: 18 }, // Телефон
    { wch: 12 }, // Дата
    { wch: 12 }, // Время
    { wch: 25 }, // Откуда
    { wch: 25 }, // Куда
    { wch: 15 }, // Статус
    { wch: 20 }, // Водитель
    { wch: 25 }, // Авто
    { wch: 12 }, // Цена
    { wch: 18 }, // Длительность
    { wch: 18 }, // Расстояние
    { wch: 10 }, // Рейтинг
    { wch: 30 }, // Заметки
  ];
  XLSX.utils.book_append_sheet(workbook, mainWorksheet, "Вызовы");

  // Лист со статистикой
  const statsData = Object.entries(stats).map(([key, value]) => ({
    Показатель: key,
    Значение: value,
  }));
  const statsWorksheet = XLSX.utils.json_to_sheet(statsData);
  statsWorksheet["!cols"] = [{ wch: 25 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(workbook, statsWorksheet, "Статистика");

  XLSX.writeFile(
    workbook,
    `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Ожидает";
    case "accepted":
      return "Принят";
    case "completed":
      return "Завершен";
    case "cancelled":
      return "Отменен";
    case "no_answer":
      return "Нет ответа";
    default:
      return status;
  }
};
