const API = import.meta.env.VITE_API_URL || 'https://dev.misqabbi.com/api/v1';

// Helper wrapper for fetch
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  const res = await fetch(`${API}${endpoint}`, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${res.status}`);
  }

  return res.json();
}

// Auth APIs
export const signup = data =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify(data) });

export const login = data => request('/auth/login', { method: 'POST', body: JSON.stringify(data) });

// Product APIs
export const getProducts = () => request('/products');
export const getProduct = id => request(`/products/${id}`);

// Orders APIs
// export const getOrders = () => request('/orders');
// export const getOrder = id => request(`/orders/${id}`);
// export const checkout = data =>
//   request('/orders/checkout', { method: 'POST', body: JSON.stringify(data) });
