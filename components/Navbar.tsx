"use client";

import Link from 'next/link';
import { useStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Navbar = () => {
  const { cart, user, setUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!user || user.id !== parsedUser.id) {
        setUser(parsedUser);
      }
    }
  }, [setUser, user]);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Minha Loja</div>
      <div className="flex gap-6 items-center">
        <Link href="/products" className="hover:underline">Produtos</Link>
        <Link href="/cart" className="hover:underline">Carrinho ({cart.length})</Link>
        {user ? (
          <>
            <span>Bem-vindo, {user.name}!</span>
            <button
              onClick={handleLogout}
              className="px-5 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Sair
            </button>
          </>
        ) : (
          <Link href="/login" className="px-5 rounded text-blue-500">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
