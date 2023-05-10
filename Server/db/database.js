import mysql from 'mysql2';
import { config } from '../config.js'; 


// database를 사용하기 위한 pool(통상용어)
// .env를 통해 작성하기
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password
    // host:'127.0.0.1',
    // user:'root',
    // database:'dwitter',
    // password:'1234'
})


export const db = pool.promise() // 비동기 처리를 위해 promise()객체화 후 export