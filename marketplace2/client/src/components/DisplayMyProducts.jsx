import './DisplayProducts.css';
import DisplayProduct from './DisplayProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserID } from '../hook/getUserId';
import BACKEND_URL from '../constants';

export const DisplayMyProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log('getUserID()', getUserID());
    async function get() {
      await axios
        .get(BACKEND_URL + '/products/' + getUserID())
        .then(response => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    get();
  }, []);

  return (
    <>
      <div className="container">
        {products.map((product, i) => {
          return (
            <DisplayProduct
              key={i}
              product={{
                name: product.name,
                image: BACKEND_URL + '/images/' + product.fileNameOnServer,
                description: product.description,
                price: product.price,
                sale: product.sale,
                exchange: product.exchange,
                id: product._id,
              }}
              displayDeleteButton={true}
            />
          );
        })}
      </div>
    </>
  );
};

export default DisplayMyProducts;
