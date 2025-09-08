import { beforeEach, describe, expect, it } from 'vitest'
import { authService } from '../utils/auth'

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Token Management', () => {
    it('should save and retrieve token correctly', () => {
      const token = 'jdjaajdjadtest-token';
      
      localStorage.setItem('token', token);
      const retrievedToken = authService.getToken();
      
      expect(retrievedToken).toBe(token);
    });

    it('should return null when no token exists', () => {
      const token = authService.getToken();
      expect(token).toBeNull();
    });
  });

  describe('Authentication Status', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('token', 'test-token');
      const isAuthenticated = authService.isAuthenticated();
      expect(isAuthenticated).toBe(true);
    });

    it('should return false when no token exists', () => {
      const isAuthenticated = authService.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('Logout', () => {
    it('should remove token from localStorage on logout', () => {
      localStorage.setItem('token', 'test-token');
      authService.logout();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});