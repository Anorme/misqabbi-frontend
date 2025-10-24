import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let failedQueue = [];

const processQueue = error => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

export const setupAxiosInterceptor = onSessionExpired => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      // Only handle 401 errors, and only once per request
      if (error.response?.status === 401 && !originalRequest._retry) {
        // If already refreshing, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => axios(originalRequest))
            .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Attempt to refresh tokens
          await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });

          // Refresh succeeded, process queued requests
          processQueue(null);

          // Retry original request
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh failed - session expired
          processQueue(refreshError);

          // Call the callback to handle session expiration
          onSessionExpired();

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
