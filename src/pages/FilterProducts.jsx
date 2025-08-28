// src/utils/filterProducts.js

export default function filterProducts(products, filter) {
  if (!Array.isArray(products)) return [];

  if (!filter || filter === "All") return products;

  switch (filter) {
    case "Newest":
      return [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case "Oldest":
      return [...products].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    case "Popular":
      return [...products].sort((a, b) => b.sales - a.sales);
    default:
      return products;
  }
}
