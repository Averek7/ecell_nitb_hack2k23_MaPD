import { body, validationResult } from 'express-validator';
import log from '../../log.js';
import { addMint, fetchHistory } from '../db/mint.js';

const addMintHis = async(req, res) => {
    const {address, title, description, image} = req.body;

    try {
        const re = await addMint({ address, title, description, image });

        return res.status(200).json({
            message: 'success'
        })
    } catch (err) {
        log.error({ err }, '[addMintHis][error]');

        return res.status(500).json({
            message: "error"
        })
    }
}

const fetchHis = async(req, res) => {
    const {address} = req.query;

    try {
        const [r] = await fetchHistory({ address });

        log.debug({ r }, '[fetchHis][success]');

        return res.status(200).json({
            message: "success",
            response: r
        })
    } catch (err) {
        log.error({ err }, '[fetchHis][error]');
        return res.status(500).json({
            message: "error"
        })
    }
}

export {addMintHis, fetchHis}