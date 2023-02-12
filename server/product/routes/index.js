import express from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../../auth/controllers/auth.js';
import { insertProduct, searchProduct, generateQR, updateIpfs, fetchIpfs } from '../controllers/product.js';

const router = express.Router();

router.post('/insertProcduct', verifyToken, async(req, res) => {
    insertProduct(req, res);
})

router.get('/searchProcduct', verifyToken, async(req, res) => {
    searchProduct(req, res);
})

router.get('/generateQR', verifyToken, async(req, res) => {
    generateQR(req, res);
})

router.post('/updateIpfs', verifyToken, async(req, res) => {
    updateIpfs(req, res);
})

router.get('/fetchIpfs', verifyToken, async(req, res) => {
    fetchIpfs(req, res);
})

export default router;