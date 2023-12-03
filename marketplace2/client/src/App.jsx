import React from 'react';
import { RouterProvider, createBrowserRouter,Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import './App.css';
import Layout from './components/Layout';
import Products from './pages/Products';
import RegisterProducts from './pages/RegisterProducts';
import UserProfile from './pages/UserProfile';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <>
        <Layout>

        </Layout>
        {/* <Outlet /> */}
        </>
  );
};

export default App;
