import apiClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  profilePicture?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  timestamp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
  timestamp: string;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    user: User;
  };
  timestamp: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

class AuthService {
  // User Registration
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting registration with data:', userData);
      const response = await apiClient.post('/auth/register', userData);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
      throw new Error(error.response?.data?.error || error.message || 'Registration failed');
    }
  }

  // User Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting login with credentials:', credentials);
      const response = await apiClient.post('/auth/login', credentials);
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
      throw new Error(error.response?.data?.error || error.message || 'Login failed');
    }
  }

  // Refresh Access Token
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post('/auth/refresh-token', { refreshToken });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Token refresh failed');
    }
  }

  // Get User Profile
  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to get profile');
    }
  }

  // Logout
  async logout(refreshToken: string): Promise<void> {
    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch (error: any) {
      // Even if logout fails on server, we should clear local storage
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      await this.clearAuthData();
    }
  }

  // Forgot Password
  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to send reset email');
    }
  }

  // Reset Password
  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await apiClient.post('/auth/reset-password', { token, password });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Password reset failed');
    }
  }

  // Store authentication data
  async storeAuthData(authResponse: AuthResponse): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        ['accessToken', authResponse.data.accessToken],
        ['refreshToken', authResponse.data.refreshToken],
        ['user', JSON.stringify(authResponse.data.user)],
      ]);
    } catch (error) {
      throw new Error('Failed to store authentication data');
    }
  }

  // Get stored authentication data
  async getStoredAuthData(): Promise<{
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
  }> {
    try {
      const [accessToken, refreshToken, userString] = await AsyncStorage.multiGet([
        'accessToken',
        'refreshToken',
        'user',
      ]);

      const user = userString[1] ? JSON.parse(userString[1]) : null;

      return {
        accessToken: accessToken[1],
        refreshToken: refreshToken[1],
        user,
      };
    } catch (error) {
      console.error('Error getting stored auth data:', error);
      return {
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    }
  }

  // Clear authentication data
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const { accessToken, refreshToken } = await this.getStoredAuthData();
      return !!(accessToken && refreshToken);
    } catch (error) {
      return false;
    }
  }

  // Update stored user data
  async updateStoredUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error updating stored user:', error);
    }
  }

  // Upload profile picture
  async uploadProfilePicture(imageUri: string): Promise<{ imageUrl: string }> {
    try {
      const formData = new FormData();
      
      formData.append('profilePicture', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile-picture.jpg',
      } as any);

      const response = await apiClient.post('/users/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Profile picture upload error:', error);
      throw new Error(error.response?.data?.error || 'Failed to upload profile picture');
    }
  }

  // Delete profile picture
  async deleteProfilePicture(): Promise<void> {
    try {
      await apiClient.delete('/users/profile-picture');
    } catch (error: any) {
      console.error('Profile picture delete error:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete profile picture');
    }
  }
}

export default new AuthService();
