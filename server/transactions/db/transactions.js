import { pool } from '../../connections/db.js';


const addTransactionQuery = (payload) => {
    const query = `INSERT INTO transactions (from_email, from_address, to_email, to_address, link, created_at )
    values (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`;

    return pool.query(query, [payload.from_email, payload.from_address, payload.to_email, payload.to_address, payload.link ]);

}


const getCreditedTransactions = (payload) => {

    const query = `SELECT * FROM transactions WHERE to_email = ?`;
    return pool.query(query, [payload.email]);
}

const getDebitedTrasnactions = (payload) => {

    const query = `SELECT * FROM transactions WHERE from_email = ?`;
    return pool.query(query, [payload.email]);

}



export { addTransactionQuery, getCreditedTransactions, getDebitedTrasnactions };
