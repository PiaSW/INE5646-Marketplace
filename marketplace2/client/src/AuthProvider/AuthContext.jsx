import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import BACKEND_URL from '../constants';
// Criação de um contexto para autenticação
const AuthContext = createContext();

// Provedor de Autenticação
export const AuthProvider = ({ children }) => {
  // Estado local para armazenar informações do usuário
  const [user, setUser] = useState(null);

  // Função para realizar login
  const login = async (email, password) => {
    try {
      // Faz uma chamada de API para autenticação
      const response = await axios.post(
        BACKEND_URL + '/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Extrai o token ou outras informações relevantes da resposta
      const auth = response.headers;
      console.log(auth);

      // Define o usuário no estado local
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  // Função para realizar registro de usuário
  const register = async (name, email, password) => {
    try {
      // Faz uma chamada de API para registrar um novo usuário
      const response = await axios.post(
        BACKEND_URL + '/auth/register',
        { name, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Função para verificar a sessão do usuário
  const session = async (email, password) => {
    try {
      // Faz uma chamada de API para obter informações da sessão
      const response = await axios.post(
        BACKEND_URL + '/auth/session',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Define o usuário no estado local
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  // Função para realizar logout
  const logout = () => {
    // Lógica de logout
    setUser(null);
  };

  // Efeito colateral para verificar a sessão ao inicializar
  useEffect(() => {
    session();
  }, []);

  // Provedor de contexto que fornece as funções e estado de autenticação
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};
