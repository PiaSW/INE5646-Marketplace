import React from 'react'
import { useState, useEffect } from 'react';
import './RegisterProducts.css'
import DisplayProduct from '../components/DisplayProduct';
import axios from 'axios';
import BACKEND_URL from '../constants';
export const RegisterProducts = () => {
  // Estados locais para armazenar dados do formulário
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [sale, setSale] = useState(false);
  const [exchange, setExchange] = useState(false);
  const [inputError, setInputError] = useState(null);

  // Função para lidar com alterações no preço
  function handlePriceOnChange(event) {
    setPrice(parseFloat(event.target.value));
    var value = event.target.value;
    var regex = /^(?:\d+|\d+,\d{2}|\d+\.\d{2})$/;
    var isValidated = regex.test(value);

    if (isValidated) {
      setInputError(null);
    } else {
      setInputError('Only numbers');
    }
  }

  // Função para lidar com alterações no nome do produto
  function handleProductNameOnChange(event) {
    setProductName(event.target.value);
  }

  // Função para lidar com alterações na descrição do produto
  function handleProductDescriptionOnChange(event) {
    setProductDescription(event.target.value);
  }

  // Função para lidar com alterações na checkbox de venda
  function handleSaleCheckboxOnChange() {
    setSale(!sale);
  }

  // Função para lidar com alterações na checkbox de troca
  function handleExchangeCheckboxOnChange() {
    setExchange(!exchange);
  }

  // Função para enviar o formulário
  async function submitForm(event) {
    event.preventDefault();

    // Valida se pelo menos uma opção de disponibilidade está marcada
    if (!sale && !exchange) {
      setInputError('Marcar se o produto está disponível para venda e/ou troca!');
    } else {
      setInputError(null);
    }

    // Dados a serem enviados na chamada da API
    const data = {
      "name": productName,
      "description": productDescription,
      "price": parseFloat(price),
      sale,
      exchange,
      image
    };

    // Chamada da API para registrar o produto
    await axios.post(BACKEND_URL + '/products/', { data }, {
      headers: { "Content-Type": 'application/json' },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Função para lidar com a seleção de arquivo
  function handleFileInput(event) {
    setFile(
      URL.createObjectURL(event.target.files[0])
    );

    setFileName(event.target.files[0].name);

    const formData = new FormData();
    formData.append('productImage', event.target.files[0], event.target.files[0].name);
    setImage(formData);
  }

  // Renderiza o componente
  return (
    <div className="App">
      <h2>Bem-vindo ao Cadastro de Produtos</h2>
      <form>
        {/* Campos do formulário */}
        <label htmlFor="productName">Nome do produto</label>
        <input id="productName" type="text" onChange={handleProductNameOnChange} />
        <label htmlFor="productDescription">Descrição</label>
        <textarea id="productDescription" cols="40" rows="3" onChange={handleProductDescriptionOnChange} />
        <label htmlFor="productPrice">Preço</label>
        <input id="productPrice" type="number" placeholder='Preço' onChange={handlePriceOnChange} />
        {inputError && <div style={{ color: 'red' }}>{inputError}</div>}
        <div className="checkbox-container">
          <input type="checkbox" name="checkboxSale" id="sale" onClick={handleSaleCheckboxOnChange} />
          <label htmlFor="sale">Venda</label>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" name="checkboxTrade" id="exchange" onClick={handleExchangeCheckboxOnChange} />
          <label htmlFor="exchange">Troca</label>
        </div>

        {/* Seletor de arquivo */}
        <div>
          <label htmlFor="file" className='btn-label'>Select Image</label>
          <span>{fileName}</span>
          <input id="file" hidden type="file" onChange={handleFileInput} />
        </div>
        <br />

        {/* Exibição da imagem selecionada */}
        {file && <img className='product-image' src={file} />}

        {/* Botão de envio do formulário */}
        <button type="submit" onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
}

export default RegisterProducts