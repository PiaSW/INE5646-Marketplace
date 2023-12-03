import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import './App.css';
import Layout from './components/Layout';
import Products from './pages/Products';
import RegisterProducts from './pages/RegisterProducts';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    // Componente principal que define as rotas da aplicação
    <Routes>
      {/* Layout é um componente que pode ser usado para envolver outras rotas */}
      <Route element={<Layout />}>
        {/* Rota para a página inicial */}
        <Route path="/" element={<Home />} />
        <Route path="/INE5646-Marketplace" element={<Home />} />

        {/* Rota para a página de produtos */}
        <Route path="/products" element={<Products />} />

        {/* Rota para a página de contato */}
        <Route path="/contact" element={<Contact />} />

        {/* Rota para a página de registro de usuário */}
        <Route path="/auth" element={<Auth />} />

        {/* Rota para a página de registro de produtos */}
        <Route path="/my-products" element={<RegisterProducts />} />

        {/* Rota para a página do perfil do usuário */}
        <Route path="/userProfile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
