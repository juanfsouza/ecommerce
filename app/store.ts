import { create } from 'zustand';
import { toast } from 'react-toastify';
import router from 'next/router';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  id: number;
  name: string;
  balance: number;
}

interface StoreState {
  cart: Product[];
  products: Product[];
  user: User | null;
  setUser: (user: User | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  setProducts: (products: Product[]) => void;
  checkout: (userId: number, totalAmount: number) => Promise<void>;
}

const getPersistedCart = (): Product[] => {
  if (typeof window !== 'undefined') {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCart = (cart: Product[]) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
};

const getPersistedUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return {
        ...parsedUser,
        id: Number(parsedUser.id),
      };
    }
  }
  return null;
};

const saveUser = (user: User | null) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};

export const useStore = create<StoreState>((set) => ({
  cart: getPersistedCart(),
  products: [],
  user: getPersistedUser(),
  
  // Atualiza o usuário e persiste no sessionStorage
  setUser: (user) => {
    saveUser(user);
    set({ user });
  },
  
  // Adiciona um produto ao carrinho
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find(p => p.id === product.id);
    const newCart = existingProduct
      ? state.cart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      : [...state.cart, { ...product, quantity: 1 }];
    saveCart(newCart);
    return { cart: newCart };
  }),
  
  // Remove um produto do carrinho
  removeFromCart: (id) => set((state) => {
    const newCart = state.cart.filter(product => product.id !== id);
    saveCart(newCart);
    return { cart: newCart };
  }),
  
  // Aumenta a quantidade de um produto
  increaseQuantity: (id) => set((state) => {
    const newCart = state.cart.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    saveCart(newCart);
    return { cart: newCart };
  }),
  
  // Diminui a quantidade de um produto
  decreaseQuantity: (id) => set((state) => {
    const newCart = state.cart.map(product =>
      product.id === id ? { ...product, quantity: Math.max(product.quantity - 1, 1) } : product
    );
    saveCart(newCart);
    return { cart: newCart };
  }),
  
  // Limpa o carrinho
  clearCart: () => set(() => {
    saveCart([]);
    return { cart: [] };
  }),
  
  // Define os produtos disponíveis
  setProducts: (products) => set({ products }),
  
  // Processa o checkout
  checkout: async (userId: number, totalAmount: number) => {
    try {
      const response = await fetch('/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, totalAmount }),
      });
  
      if (!response.ok) {
        throw new Error('Checkout failed');
      }
  
      const result = await response.json();
      if (result.success) {
        console.log('Compra realizada com sucesso:', result);
  
        // Atualiza o estado do usuário com o novo saldo
        set((state) => {
          if (state.user && state.user.id === userId) {
            return { user: { ...state.user, balance: result.newBalance } }; // Atualiza o saldo
          }
          return state; // Não faz nada se não houver mudança
        });
  
        // Exibir mensagens de sucesso
        toast.success('Compra aprovada!');
        toast.info(`Seu saldo é agora: $${result.newBalance.toFixed(2)}`);
        
        // Redirecionar para a página de sucesso
        router.push('/success');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
    }
  },
}));
