/* eslint-disable react/prop-types */
import './DisplayProduct.css';
import Sale from './Sale';
import Exchange from './Exchange';
import TrashBin from '/trash.svg';
import axios from 'axios';
import BACKEND_URL from '../constants';

export const DisplayProduct = ({ product, displayDeleteButton }) => {
  const priceSymbol = '$';
  var priceWhole = String(product.price).split('.')[0];
  var priceFraction = String(product.price).split('.')[1] || '00';

  async function handleDeleteProduct() {
    console.log(product.id);
    await axios
      .delete(BACKEND_URL + '/products/' + product.id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    window.location.reload();
  }
  return (
    <div id="card-container">
      {displayDeleteButton && (
        <div className="delete-button">
          <img id="trash-bin" src={TrashBin} onClick={handleDeleteProduct} />
        </div>
      )}
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
