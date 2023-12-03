import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import './App.css';
import Layout from './components/Layout';
import Products from './pages/Products';
import RegisterProducts from './pages/RegisterProducts';
import UserProfile from './pages/UserProfile';

const router = createBrowserRouter(
  [{
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },{
    path: "/auth",
    element: <Auth />,
  },{
    path: "/my-products",
    element: <RegisterProducts />,
  },{
    path: "/userProfile",
    element: <UserProfile />,
  }],
  {basename: import.meta.env.BASE_URL}
)
const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
   
  );
};

export default App;
