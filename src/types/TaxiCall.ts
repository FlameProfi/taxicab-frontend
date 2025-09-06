export interface TaxiCall {
  id: number;
  clientName: string;
  clientPhone: string;
  callTime: string; // ISO строка
  pickupAddress: string;
  destinationAddress: string;
  status: "pending" | "accepted" | "completed" | "cancelled" | "no_answer";
  driverName?: string;
  carModel?: string;
  carNumber?: string;
  price?: number;
  duration?: number; // в минутах
  distance?: number; // в км
  rating?: number; // от 1 до 5
  notes?: string;
}
