// Table helper utilities for admin dashboard

export const paginateData = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    paginatedData: data.slice(startIndex, endIndex),
    totalPages: Math.ceil(data.length / limit),
    totalItems: data.length,
    currentPage: page,
  };
};

export const sortData = (data, sortBy, sortOrder = 'asc') => {
  return [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      const itemValue = item[key];

      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }

      return itemValue === value;
    });
  });
};

export const searchData = (data, searchTerm, searchFields) => {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();

  return data.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};

export const formatCurrency = amount => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount);
};

export const getStatusColor = status => {
  const colors = {
    accepted: 'bg-msq-gold-light/20 text-msq-purple-deep',
    processing: 'bg-msq-gold-light/20 text-msq-purple-deep',
    ready: 'bg-msq-gold-light/20 text-msq-purple-deep',
    enroute_pickup: 'bg-blue-100 text-blue-700',
    picked_up: 'bg-purple-100 text-msq-purple-deep',
    in_transit: 'bg-blue-100 text-blue-700',
    arrived: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-800',
  };

  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getRoleColor = role => {
  const colors = {
    admin: 'bg-purple-100 text-purple-800',
    customer: 'bg-blue-100 text-blue-800',
  };

  return colors[role] || 'bg-gray-100 text-gray-800';
};
