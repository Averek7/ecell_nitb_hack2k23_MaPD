import { pool } from '../../connections/db.js';

const addMint = async (payload) => {
    const query = `INSERT INTO mint_history (address, title, description, image)
    VALUES (?, ?, ?, ?);`;

    return pool.query(query, [payload.address, payload.title, payload.description, payload.image]);
}

const fetchHistory = async(payload) => {
    const query = `SELECT mh.id as histId, mh.address as ifps, mh.title, mh.description, mh.image
    FROM mint_history mh
    WHERE mh.address = ?;`;

    return pool.query(query, [payload.address]);
}

export {addMint, fetchHistory};