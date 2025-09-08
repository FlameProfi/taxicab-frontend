export interface DriverApplication {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  drivingExperience: number;
  carModel?: string;
  carYear?: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}