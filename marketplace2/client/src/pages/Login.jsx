import React from 'react'
import axios from '../api/axios'
import { useState } from 'react';
import { useAuth } from '../AuthProvider/AuthContext';

export const Login = () => {
  // Estados locais para controlar os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Obtém a função de login do hook de autenticação
  const { login } = useAuth();

  // Função chamada ao enviar o formulário de login
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário

    try {
      setEmail(''); // Limpa o estado do e-mail
      setPassword(''); // Limpa o estado da senha

      // Chama a função de login passando e-mail e senha
      login(email, password);

      window.location.href = '/'; // Redireciona o usuário para a página inicial

    } catch (error) {
      alert('Password Incorreta'); // Exibe um alerta para senha incorreta
      console.log('errr', error);
      setErrMsg(error.response.data.message); // Configura a mensagem de erro (não está definido no código)
      alert(error.response.data.message); // Exibe um alerta com a mensagem de erro
    }
  };

  // Renderiza o componente de login
  return (
    <div>
      {/* Formulário de Login */}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        {/* Campo de E-mail */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo de Senha */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Botão de Login */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login