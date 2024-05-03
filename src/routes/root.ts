import express from 'express';
import { produtores } from '../controllers/produtoresController';
const router = express.Router();

 router.get('/produtores', produtores);
module.exports = router;