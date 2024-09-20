"use client"

import { useEffect } from 'react';
import { useStore } from '@/app/store';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/app/store';

const ProductsPage = () => {
  const { products, setProducts } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>Carregando produtos...</p>
      )}
    </div>
  );
};

export default ProductsPage;
