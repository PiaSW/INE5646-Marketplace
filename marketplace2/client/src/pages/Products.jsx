import React from 'react';
import DisplayProducts from '../components/DisplayProducts';

export const Products = () => {
  // Renderiza o componente
  return (
    <div className="App">
      <h2>Bem-vindo ao Produtos</h2>
      <DisplayProducts />
    </div>
  );
};

export default Products;
