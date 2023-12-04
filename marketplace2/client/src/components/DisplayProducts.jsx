import './DisplayProducts.css';
import DisplayProduct from './DisplayProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../constants';

export const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function get() {
      await axios
        .get(BACKEND_URL + '/products/')
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
                contact: product.contact,
                price: product.price,
                sale: product.sale,
                exchange: product.exchange,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default DisplayProducts;
