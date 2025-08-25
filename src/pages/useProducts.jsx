import { useState, useEffect } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
