import {pool} from '../../connections/db.js';

const register = (payload) => {
    const query = `INSERT INTO admin_info (name, email, password, role, coordinate_x, coordinate_y)
    values (?, ?, ?, ?, ?, ?);`;

        console.log(payload);

    return pool.query(query, [payload.name, payload.email, payload.password, payload.role, payload.coordinateX, payload.coordinateY]);
}

const userInfoDb = (payload) => {
    const query = `SELECT ai.id as userId, ai.email, ai.role, ai.name
    FROM admin_info as ai
    WHERE ai.id = ?;`;

    return pool.query(query, [payload.id]);
}

const checkEmail  = (payload) => {
    const query = `SELECT COUNT(*) as count
    FROM admin_info ai
    WHERE ai.email = ?;`;

    return pool.query(query, [payload.email]);
}

const login = (payload) => {
    const query = `SELECT ai.id as userId, ai.email, ai.password, ai.role, ai.name
    FROM admin_info ai
    WHERE ai.email = ?;`;

    return pool.query(query, [payload.email]);
}

export {register, login, checkEmail, userInfoDb};