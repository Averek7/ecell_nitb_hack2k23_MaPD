import { body, validationResult } from 'express-validator';
import log from '../../log.js';
import { insertProductDb, insertProductId, searchProductDb } from '../db/product.js';
import QRCode from 'qrcode';
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

const searchProduct = async (req, res) => {
    const { query } = req.query;
    const userId = req.userId
    try {
        console.log(query);
        const q = formatSearchKey(query);
        const [r] = await searchProductDb({ query: q, userId });
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

const printQR = async(stringdata) => {
    QRCode.toString(stringdata, { type: 'terminal' },
        function (err, QRcode) {

            if (err) return console.log("error occurred")

            // Printing the generated code
            console.log(QRcode)
        })
}

const generateQR = async (req, res) => {
    const { uuid } = req.query;

    try {
        const insertPro = await insertProductId({uuid});

        let data = {uuid};

        let stringdata = JSON.stringify(data);

        //getting qr code from the qrdata by calling function
        QRCode.toDataURL(stringdata, function (err, code) {
            if(err) {
                 console.log("error occurred")
                 return res.status(500).json({
                    message: 'error',
                    error: "INTERNAL SERVER ERROR"
                 })
            }
         
            // Printing the code
            console.log(code)
            return res.status(200).json({
                message: 'success',
                code
            })
        })
    } catch (err) {
        log.error({ err }, '[generateQR][error]');

        return res.status(500).json({
            message: "error"
        })
    }
}

export { insertProduct, searchProduct, generateQR };