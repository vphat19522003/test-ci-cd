import { toast } from 'react-toastify';

import axios, { AxiosInstance } from 'axios';

import { removeTokenFromCache, removeUserFromCache } from '@app/utils/persistCache/auth';

const API_URL =
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_LOCAL_URL : import.meta.env.VITE_API_PRODUCT_URL;

const axiosCustom: AxiosInstance = axios.create({
  baseURL: API_URL, // URL API
  withCredentials: true, // Send cookies with request
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosCustom.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosCustom.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log({ response });
        return axiosCustom(originalRequest);
      } catch (refreshError: any) {
        // Xóa cookies nếu refresh token hết hạn
        removeTokenFromCache();
        removeUserFromCache();

        toast.warning('Logged out due to unauthoried', {
          autoClose: 3000,
          onClose: () => {
            window.location.href = '/login';
          }
        });

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosCustom;
