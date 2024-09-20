"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
    
      if (response.ok) {
        const data = await response.json();
        // Salvar dados do usuário no sessionStorage
        sessionStorage.setItem("user", JSON.stringify({
          id: data.id, // Inclua o ID do usuário aqui
          name: data.name,
          balance: data.balance,
        }));
        toast.success('Cadastro realizado com sucesso!');
        router.push('/login'); // Redireciona para a página de login após registro
      } else {
        toast.error('Erro ao realizar cadastro!');
      }
    } catch (error) {
      toast.error('Erro ao realizar cadastro!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4 text-center">Registrar</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
        <p className="mt-4 text-center">
          Já tem uma conta? <a href="/login" className="text-blue-500">Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
