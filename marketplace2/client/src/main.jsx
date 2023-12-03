import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthProvider/AuthContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Contact } from './pages/Contact.tsx';
import Products from './pages/Products.jsx';
import RegisterProducts from './pages/RegisterProducts.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Auth from './pages/Auth.jsx';

// Envolva a renderização em ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/INE5646-Marketplace/',
    element: <App />,
    children: [
      {
        path: '/INE5646-Marketplace/',
        element: <Home />,
      },
      {
        path: '/INE5646-Marketplace/contact',
        element: <Contact />,
      },
      {
        path: '/INE5646-Marketplace/products',
        element: <Products />,
      },
      {
        path: '/INE5646-Marketplace/my-products',
        element: <RegisterProducts />,
      },
      {
        path: '/INE5646-Marketplace/userProfile',
        element: <UserProfile />,
      },
      {
        path: '/INE5646-Marketplace/auth',
        element: <Auth />,
      },
    ],
  },
]);

// Renderize o aplicativo dentro do BrowserRouter e AuthProvider
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

  // <BrowserRouter>
  //   <AuthProvider>
  //     <App />
  //   </AuthProvider>
  // </BrowserRouter>
);
