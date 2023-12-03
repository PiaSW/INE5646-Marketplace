/* eslint-disable react/prop-types */
import './DisplayProduct.css';
import React from 'react';
import Sale from './Sale';
import Exchange from './Exchange';
export const DisplayProduct = ({ product }) => {
  const priceSymbol = '$';

  var priceWhole = String(product.price).split('.')[0];
  var priceFraction = String(product.price).split('.')[1] || '00';
  return (
    <div id="card-container">
      <div id="image-container">
        <img id="product-image" src={product.image} />
      </div>
      <div id="description-container">
        <div>
          <span className="product-name">{product.name}</span>
        </div>
        <div className="product-description-container">
          <span className="product-description">{product.description}</span>
        </div>
        <div className="price-row">
          <span className="price-symbol">{priceSymbol}</span>
          <span className="price-whole">{priceWhole}</span>
          <span className="price-fraction">{priceFraction}</span>
        </div>
        {product.sale && <Sale />}
        {product.exchange && <Exchange />}
      </div>
    </div>
  );
};

export default DisplayProduct;
