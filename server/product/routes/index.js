import express from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../../auth/controllers/auth.js';
import { insertProduct, searchProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/insertProcduct', verifyToken, async(req, res) => {
    insertProduct(req, res);
})

router.get('/searchProcduct', verifyToken, async(req, res) => {
    searchProduct(req, res);
})

export default router;