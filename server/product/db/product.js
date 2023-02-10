import {pool} from '../../connections/db.js';

const insertProductDb = (payload) => {
    const query = `INSERT INTO product_info (mfg_id, product_name, brand, measure, quantity, code_number)
    values (?, ?, ?, ?, ?, ?);`;

    return pool.query(query, [payload.mfgId, payload.productName, payload.brand, payload.measure, payload.quantity, payload.code]);
}

export {insertProductDb};