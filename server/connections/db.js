import bluebird from 'bluebird';
import mysql from 'mysql2/promise';

import { host, mysql_user, mysql_db, mysql_password, port, connection_pool } from '../config.js';

const mysqlHost = host;
const mysqlUser = mysql_user;


const mysqlPassword = mysql_password;
const mysqlDb = mysql_db;
/*
*-
* Connection Options
*
* */
const options = {
    connectionLimit: connection_pool,
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDb,
    multipleStatements: true,
    Promise: bluebird,
};

bluebird.longStackTraces();

const pool = mysql.createPool(options);

const CONNECTION_LOST = 'PROTOCOL_CONNECTION_LOST';
const EPIPE = 'EPIPE';

const wrapper = {};

wrapper.query = (queryString, queryArgs) => {
    return pool.query(queryString, queryArgs)
        .catch((err) => {
            // handle connection lost and fd errors
            if (err.code === CONNECTION_LOST || err.code === EPIPE) {
                logger.error({ err }, 'PROTOCOL_CONNECTION_LOST|EPIPE - Retrying');
                return wrapper.query(queryString, queryArgs);
            }

            logger.error({ err, queryString }, 'DB_QUERY_FAILED_WITHOUT_RETRY');
            return Promise.reject(err);
        });
};

wrapper.escape = input => pool.escape(input);
wrapper.getConnection = () => pool.getConnection();

export {wrapper, pool};