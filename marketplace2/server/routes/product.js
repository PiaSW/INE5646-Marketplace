import express from 'express';
import { Product } from '../models/product.js';
import multer from 'multer';
import path from 'path';
const router = express.Router();

// Rota POST para criar um novo produto
router.post('/', async (request, response) => {
  try {
    // Exibe os dados recebidos no corpo da requisição
    console.log(request.body);
    // Cria um novo objeto representando o produto
    const newProduct = {
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      sale: request.body.sale,
      exchange: request.body.exchange,
      fileNameOnServer: request.body.fileNameOnServer,
    };

    // Cria o produto no banco de dados e retorna uma resposta de sucesso
    const product = await Product.create(newProduct);
    return response.status(200).send(product);
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Rota PUT para atualizar um produto
router.put('/', async (request, response) => {
  try {
    // Cria um novo objeto representando o produto atualizado
    const newProduct = {
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      sale: request.body.sale,
      exchange: request.body.exchange,
      _id: request.body.id,
    };

    // Atualiza o produto no banco de dados e retorna uma resposta de sucesso
    const product = await Product.updateOne(newProduct);
    return response.status(200).send(product);
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Rota GET para obter todos os produtos
router.get('/', async (request, response) => {
  try {
    // Busca todos os produtos no banco de dados
    const products = await Product.find({});

    // Retorna uma resposta de sucesso com os dados dos produtos
    return response.status(200).send(products);
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Rota DELETE para excluir todos os produtos
router.delete('/', async (request, response) => {
  try {
    // Exclui todos os produtos no banco de dados e retorna uma resposta de sucesso
    const products = await Product.deleteMany({});
    return response.status(200).send(products);
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
