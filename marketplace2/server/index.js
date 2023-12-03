import express from "express";
import {PORT, mongoDBurl} from "./config.js";
import mongoose from "mongoose";
import usersRoute from './routes/user.js';
import productsRoute from './routes/product.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

// Configuração para carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Configurar origens permitidas usando o middleware cors
const corsOptions = {
  origin: 'http://localhost:5173', // Adicione as origens permitidas
  optionsSuccessStatus: 200,
};

// Cria uma instância do aplicativo Express
const app = express();
const port = 5000;
// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

// Middleware para analisar cookies nas requisições
app.use(cookieParser());

// Configuração do CORS para permitir solicitações de um cliente específico
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.listen(process.env.PORT || port, console.log("connected to port:" + process.env.PORT || port ));

// Middleware CORS para permitir solicitações de qualquer origem
app.use(cors(corsOptions));

// Middleware para rotas relacionadas a autenticação
app.use('/auth', usersRoute);

// Middleware para rotas relacionadas a produtos
app.use('/products', productsRoute);

// Conecta-se ao banco de dados MongoDB usando a URL fornecida
mongoose.connect(mongoDBurl)
  .then(() => {
    console.log('App connected to DB');
    // Inicia o servidor na porta especificada
    app.listen(PORT, () => {
      console.log(`App -> port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
