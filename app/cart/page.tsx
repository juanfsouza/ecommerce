'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, useStore } from '@/app/store';
import toast, { Toaster } from 'react-hot-toast';

// motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '@/variants';

const CartPage = () => {
  const { cart, clearCart, user, removeFromCart, increaseQuantity, decreaseQuantity } = useStore();
  const [clientCart, setClientCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    setClientCart(cart);
  }, [cart]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para finalizar a compra.');
      return;
    }
  
    if (!user.id) {
      toast.error('ID do usuário não está disponível.');
      return;
    }
  
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          products: clientCart.map(product => ({
            productId: product.id,
            quantity: product.quantity || 1,
            price: product.price,
          })),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na resposta da API: ${errorData.message}`);
      }
  
      const result = await response.json();
      const newBalance = result.newBalance;
  
      // Exibe as mensagens antes de redirecionar
      toast.success(result.message, { duration: 5000 });
      toast.success(`Seu saldo é agora $${newBalance.toFixed(2)}`, {
        duration: 5000,
      });
  
      clearCart(); // Limpa o carrinho imediatamente
  
      setTimeout(() => {
        router.push('/success');
      }, 2000);
    } catch (error) {
      console.error('Checkout Error:', error);
      toast.error('Ocorreu um erro durante a finalização da compra.');
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {clientCart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <motion.div 
        variants={fadeIn('left', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.6 }} 
        className="space-y-4">
          {clientCart.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg flex items-center">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity || 1}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded ml-2 hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-gray-500 text-white px-2 py-1 rounded ml-2 hover:bg-gray-600"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total: ${clientCart.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0).toFixed(2)}</h2>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Finalizar Compra
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CartPage;
