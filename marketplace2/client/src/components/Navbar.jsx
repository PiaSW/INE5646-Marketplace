import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logo from '/logo.png';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.clear();
    navigate('/INE5646-Marketplace/auth');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marketplace</h1>
        <img src={Logo} alt="Logo" style={{ maxWidth: '8%', height: 'auto' }} />
      </header>

      <nav>
        {cookies.access_token ? (
          <>
            <div className="start">
              <Link to="/INE5646-Marketplace/">Inicio</Link>
              <Link to="/INE5646-Marketplace/products">Produtos</Link>
              <Link to="/INE5646-Marketplace/my-products">Meus Produtos</Link>
              <Link to="/INE5646-Marketplace/contact">Contato</Link>
            </div>
            <div className="user">
              <Link to="/INE5646-Marketplace/userProfile">
                Perfil de Usuario
              </Link>
            </div>
            <div className="logout">
              <button onClick={logout}> Logout </button>
            </div>
          </>
        ) : (
          <div className="login">
            <Link to="/INE5646-Marketplace/auth">Registro/Login</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
