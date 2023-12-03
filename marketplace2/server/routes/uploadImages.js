import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Rota POST para criar um novo produto
router.post('/', upload.single('file'), (request, response) => {
  try {
    // Exibe os dados recebidos no corpo da requisição
    console.log('file');
    console.log(request.file);
    return response.status(200).send({ file: request.file.filename });
  } catch (error) {
    // Retorna uma resposta de erro para erros gerais
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
