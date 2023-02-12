import express from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../../auth/controllers/auth.js';
import { addTransaction, getUserTransactions } from '../../transactions/controllers/transactions.js'


const router = express.Router();

router.post('/add',  async(req, res) => {
    addTransaction(req,res);
});

router.get('/fetch', async(req, res) => {
    getUserTransactions(req,res);
});



export default router;
