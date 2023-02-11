import express from 'express';
import { body } from 'express-validator';
import {logi, regis} from '../controllers/auth.js';

const router = express.Router();

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), async(req, res) => {
    regis(req, res);
})

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), async(req, res) => {
    logi(req, res);
})

export default router;