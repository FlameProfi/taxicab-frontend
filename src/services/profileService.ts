export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const profileService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProfile: async (userId: number, data: UpdateProfileRequest): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://localhost:7237/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении профиля');
    }

    return response.json();
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changePassword: async (data: ChangePasswordRequest): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://localhost:7237/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка при изменении пароля');
    }

    return response.json();
  }
};