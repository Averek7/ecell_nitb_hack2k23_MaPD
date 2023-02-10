import {pool} from '../../connections/db.js';

const insertProductDb = (payload) => {
    const query = `INSERT INTO product_info (mfg_id, product_name, brand, measure, quantity, code_number)
    values (?, ?, ?, ?, ?, ?);`;

    return pool.query(query, [payload.mfgId, payload.productName, payload.brand, payload.measure, payload.quantity, payload.code]);
}

const searchProductDb = (payload) => {
    const query = `SELECT pi.id           as productId,
    pi.product_name as productName,
    pi.brand        as brand,
    pi.code_number  as codeNumber,
    pi.measure,
    pi.quantity
FROM product_info pi
WHERE pi.product_name LIKE ?
OR pi.brand LIKE ? AND pi.mfg_id = ?;`;

return pool.query(query, [payload.query, payload.query, payload.userId]);
}

export {insertProductDb, searchProductDb};