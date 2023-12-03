import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../constants';

export const Auth = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  // Estados locais para controlar os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função chamada ao enviar o formulário
  const handleRegister = async e => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário

    await axios
      .post(
        BACKEND_URL + '/auth/register',
        { name, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(response => {
        console.log(response);

        alert('Usuario registado com sucesso!');
        setName(''); // Limpa o estado do nome
        setEmail(''); // Limpa o estado do e-mail
        setPassword(''); // Limpa o estado da senha
      })
      .catch(error => {
        alert('Usuario já existe!');
        console.log(error);
      });
  };

  // Renderiza o componente
  return (
    <div>
      {/* Formulário de Registro */}
      
      <form onSubmit={handleRegister}>
      <h2>Registro</h2>
        {/* Campo de Nome */}
        <label htmlFor="username">Usuário:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        {/* Campo de E-mail */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Campo de Senha */}
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Botão de Registro */}
        <button type="submit">Registro</button>
      </form>
    </div>
  );
};

const Login = () => {
  // Estados locais para controlar os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  // Obtém a função de login do hook de autenticação
  //const { login } = useAuth();

  // Função chamada ao enviar o formulário de login
  const handleLogin = async e => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário

    try {
      // Chama a função de login passando e-mail e senha
      //login(email, password);
      try {
        // Faz uma chamada de API para autenticação
        const response = await axios.post(
          BACKEND_URL + '/auth/login',
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        setCookies('access_token', response.data.token);
        window.localStorage.setItem('userID', response.data.userID);

        setEmail(''); // Limpa o estado do e-mail
        setPassword(''); // Limpa o estado da senha
        navigate('/'); // Redireciona o usuário para a página inicial
      } catch (error) {
        console.log(error);
        alert('Password Incorreta'); // Exibe um alerta para senha incorreta
      }
    } catch (error) {
      console.log('errr', error);
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
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Campo de Senha */}
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Botão de Login */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
