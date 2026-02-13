import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient, {STORAGE_KEYS} from './apiClient';
import {AuthToken, User, UserLogin} from '../types/auth';
import {getApiBaseUrl} from '../config/api';
import axios from 'axios';

export const authService = {
  login: async (credentials: UserLogin): Promise<AuthToken> => {
    const {data} = await axios.post<AuthToken>(
      `${getApiBaseUrl()}/api/app/auth/login`,
      credentials,
    );
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      const refreshToken = await AsyncStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN,
      );
      if (refreshToken) {
        await axios.post(`${getApiBaseUrl()}/api/app/auth/token/revoke`, {
          refreshToken,
        });
      }
    } finally {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
    }
  },

  getUser: async (): Promise<User> => {
    const {data} = await apiClient.get<User>('/api/app/auth/user');
    return data;
  },

  getStoredTokens: async (): Promise<{
    token: string | null;
    refreshToken: string | null;
  }> => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const refreshToken = await AsyncStorage.getItem(
      STORAGE_KEYS.REFRESH_TOKEN,
    );
    return {token, refreshToken};
  },
};
