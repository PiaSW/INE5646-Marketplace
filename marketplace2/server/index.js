import express from 'express';
import { PORT, mongoDBurl } from './config.js';
import mongoose from 'mongoose';
import usersRoute from './routes/user.js';
import productsRoute from './routes/product.js';
import uploadImageRoute from './routes/uploadImages.js';
import s3Route from './routes/s3.js';
import s3CyclicRoute from './routes/s3-cyclic.js';

import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fileupload from 'express-fileupload';

// Configuração para carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do aplicativo Express
const app = express();
const port = 5000;
// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}))
// Middleware para analisar cookies nas requisições
app.use(cookieParser());

app.use(express.static('public'));



// Configuração do CORS para permitir solicitações de um cliente específico
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.listen(process.env.PORT || port, console.log('connected to port:' + port));
// Middleware CORS para permitir solicitações de qualquer origem
app.use(cors());

// Middleware para rotas relacionadas a autenticação
app.use('/auth', usersRoute);
// Middleware para rotas relacionadas a produtos
app.use('/products', productsRoute);

app.use('/upload-images', uploadImageRoute);

app.use('/s3Url', s3Route);
app.use('/s3Cyclic', s3CyclicRoute);

// Conecta-se ao banco de dados MongoDB usando a URL fornecida
mongoose
  .connect(mongoDBurl)
  .then(() => {
    console.log('App connected to DB');
    // Inicia o servidor na porta especificada
    app.listen(PORT, () => {
      console.log(`App -> port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
