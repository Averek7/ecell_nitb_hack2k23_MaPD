import { body, validationResult } from 'express-validator';
import log from '../../log.js';
import { insertProductDb, searchProductDb } from '../db/product.js';

const formatSearchKey = (searchVal) => {
    // const searchVal = query.trim().split(' ');
    const n = searchVal.length;
    let val = ``;
    for (let i = 0; i < n; i++) {
      if (i === n - 1) {
        val += `%${searchVal[i]}%`;
      } else {
        val += `%${searchVal[i]}`;
      }
    }
    return val;
  };

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

const searchProduct = async(req, res) => {
    const {query} = req.body;
    const userId = req.userId
    try {
        console.log(query);
        const q = formatSearchKey(query);
        const [r] = await searchProductDb({query: q, userId});
        console.log(r);

        return res.status(200).json({
            messgae: "succcess",
            respose: r
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ messgae: "error" });
    }
}

export {insertProduct, searchProduct};