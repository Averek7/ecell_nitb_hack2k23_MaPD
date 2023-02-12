import express from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../../auth/controllers/auth.js';
import { addMintHis, fetchHis } from '../controllers/mint.js';

const router = express.Router();

router.post('/addMintHistory', verifyToken, async(req, res) => {
    addMintHis(req, res)
})

router.get('/fetchHistory', verifyToken, async(req, res) => {
    fetchHis(req, res);
})

export default router;