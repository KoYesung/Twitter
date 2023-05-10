import { db } from "../db/database.js"

export async function findByUsername(username){
    return db.execute('select * from users where username=?', [username]).then((result) => result[0][0])  // result[0][0]: 2차원 배열, 가입이 되면 { id: 4 } 가입된 아이디 값이 들어옴 
}

export async function createUser(user){
    //user객체의 정보를 따로따로 저장
    const { username, password, name, email, url } = user;

    // execute(sql문, 전달할 데이터값): sql구문을 실행하는 메서드
    // 여러개의 데이터를 전달할 때 대활호(배열) 사용
    // db는 promise객체
    return db.execute('insert into users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)  // insertId(생성된 id)만 찍어주기 위해

}

export async function findById(id){
    return db.execute('select id from users where id=?', [id]).then((result) => result[0][0])
}