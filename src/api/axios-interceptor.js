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

      // Only handle 401 errors once per request, and never try to refresh the refresh call.
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh')
      ) {
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

          // skipAuthRedirect still allows refresh. It only suppresses forced login navigation
          // when a silent auth restore fails and the visitor should continue as a guest.
          if (!originalRequest.skipAuthRedirect) {
            onSessionExpired();
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
