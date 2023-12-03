import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {mongoDBurl} from "../config.js";

const router = express.Router();

// Rota POST para o registro de um novo usuário
router.post('/register', async (request, response) => {
  try {
    // Log para registrar a tentativa de registro e exibir os dados recebidos
    console.log('registo', request.body);

    // Verifica se todos os campos obrigatórios foram fornecidos no corpo da requisição
    if (
      !request.body.name ||
      !request.body.password ||
      !request.body.email
    ) {
      // Retorna uma resposta de erro se algum campo estiver ausente
      return response.status(400).send({
        message: 'Send all required fields: name, email, password',
      });
    }

    // Procura o usuário no banco de dados pelo email fornecido
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      return response.status(405).json({ message: 'User already exist!' });
    }

    // Gera um salt para a criptografia da senha
    const salt = await bcrypt.genSalt();

    // Hash da senha usando o salt gerado
    const passwordHash = await bcrypt.hash(request.body.password, salt);

    // Cria um objeto representando o novo usuário
    const newUser = {
      name: request.body.name,
      email: request.body.email,
      password: passwordHash,
    };

    try {
      // Tenta criar o usuário no banco de dados
      await User.create(newUser);

      // Retorna uma resposta de sucesso com o usuário criado
      return response.status(200).send({message: "Usuario registado com sucesso!"});
    } catch (error) {
      // Captura erros relacionados à criação do usuário e envia uma resposta de erro
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }

  } catch (error) {
    // Captura erros gerais e envia uma resposta de erro
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//login
// Rota POST para a autenticação do usuário
router.post('/login', async (request, response) => {
  // TODO: ALTERAR
  console.log('login', request.body);

  try {
    // Verifica se os campos obrigatórios foram fornecidos no corpo da requisição
    if (!request.body.password || !request.body.email) {
      return response.status(400).send({
        message: 'Send all required fields: email, password',
      });
    }

    // Procura o usuário no banco de dados pelo email fornecido
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const checkPassword = await bcrypt.compare(request.body.password, user.password);
    if (!checkPassword) {
      return response.status(400).json({ message: 'Wrong password' });
    } else {
      try {
        // TODO: corrigir .env secret
        const secret = 'bc9fe94b3387d593047eed60bb1f206c3481258b7b41da0c97f4cc95793f8c1b';

        // Gera um token JWT e o adiciona como cookie na resposta
        const token = jwt.sign({ id: user._id }, secret);

        // Retorna uma resposta de sucesso com o token
        response.status(200).json({ msg: "Autenticação realizada com sucesso!", token, userID: user._id });
      } catch (error) {
        // Retorna uma resposta de erro se houver um problema na geração do token
        response.status(500).json({ msg: error.message });
      }
    }
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Rota POST para obter a sessão do usuário com base no token armazenado no cookie
router.post('/session', async (request, response) => {
  const secret = 'bc9fe94b3387d593047eed60bb1f206c3481258b7b41da0c97f4cc95793f8c1b';
  const token = request.cookies['MKcookie'];

  if (!token) {
    return response.status(401).send({ error: 'Token not found' });
  }

  // Obtém o ID do usuário a partir do token
  const { id } = jwt.verify(token, secret);
  if (!id) {
    return response.status(404).json({ message: 'User not found in token' });
  }

  // Procura o usuário no banco de dados pelo ID obtido do token
  const user = await User.findOne({ _id: id });
  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  // Retorna uma resposta de sucesso com os dados do usuário
  return response.status(200).json({ user: user });
});

// Rota GET para obter todos os usuários do banco de dados
router.get('/', async (request, response) => {
  try {
    // Busca todos os usuários no banco de dados
    const users = await User.find({});

    // Retorna uma resposta de sucesso com a contagem e os dados dos usuários
    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Rota GET para obter um usuário do banco de dados pelo ID
router.get('/:id', async (request, response) => {
  try {
    // Obtém o ID do parâmetro da rota
    const { id } = request.params;

    // Busca o usuário no banco de dados pelo ID
    const user = await User.findById(id);

    // Retorna uma resposta de sucesso com os dados do usuário
    return response.status(200).json(user);
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Rota PUT para atualizar um usuário pelo ID
router.put('/:id', async (request, response) => {
  try {
    // Verifica se todos os campos obrigatórios foram fornecidos no corpo da requisição
    if (!request.body.name || !request.body.password) {
      return response.status(400).send({
        message: 'Send all required fields: name, password',
      });
    }

    // Obtém o ID do parâmetro da rota
    const { id } = request.params;

    // Tenta atualizar o usuário no banco de dados pelo ID
    const result = await User.findByIdAndUpdate(id, request.body);

    // Retorna uma resposta de erro se o usuário não for encontrado
    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    // Retorna uma resposta de sucesso indicando que o usuário foi atualizado com sucesso
    return response.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Rota DELETE para excluir um usuário pelo ID
router.delete('/:id', async (request, response) => {
  try {
    // Obtém o ID do parâmetro da rota
    const { id } = request.params;

    // Tenta excluir o usuário no banco de dados pelo ID
    const result = await User.findByIdAndDelete(id);

    // Retorna uma resposta de erro se o usuário não for encontrado
    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    // Retorna uma resposta de sucesso indicando que o usuário foi excluído com sucesso
    return response.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;