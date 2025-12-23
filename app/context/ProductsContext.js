"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook for easier usage
export const useProducts = () => useContext(ProductsContext);
