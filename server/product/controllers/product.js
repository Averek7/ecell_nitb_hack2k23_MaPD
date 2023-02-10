import { body, validationResult } from 'express-validator';
import log from '../../log.js';
import { insertProductDb } from '../db/product.js';

const insertProduct = async (req, res) => {
    if (req.role === 0) {
        return res.status(400).json({
            message: "Not Allowed to connect"
        })
    }


    try {
        const { productName, brand, measure, quantity, code } = req.body;

        const [r] = await insertProductDb({ mfgId: req.userId, productName, brand, measure, quantity, code });

        console.log('r: ', r);

        return res.status(200).json({
            message: "Product Added Successfully!!"
        })
    } catch (err) {
        log.error({ err }, '[insertProduct][error]');

        return res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

export {insertProduct};