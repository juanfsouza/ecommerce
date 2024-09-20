"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '@/app/store';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // Pega a função setUser da store do Zustand
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();

        // Salvar dados do usuário em sessionStorage
        sessionStorage.setItem("user", JSON.stringify(data.user));

        // Atualiza o estado global do usuário com Zustand
        setUser(data.user);

        toast.success('Login realizado com sucesso!');
        router.push('/');
      } else {
        toast.error('Credenciais inválidas!');
      }
    } catch (error) {
      toast.error('Erro ao realizar login!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4 text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white p-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          Entrar
        </button>
        <p className="mt-4 text-center">
          Não tem conta? <a href="/register" className="text-blue-500">Registrar</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
