import { config } from '../config.js'; 
import MongoDb from 'mongodb';

let db;  // 전역변수로 설정
// DB와 연결하는 함수
export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
    .then((client) => {
        db = client.db()
    })
}

//MongoDB: NoSQL, 스키마가 없기 때문에 테이블과 컬럼에 대한 정의가 없어서 원하는 데이터 값을 그냥 넣고 빼올수 있음(자바스크립트의 객체 개념)

//collection을 리턴해주는 함수
export function getUsers(){
    return db.collection('users')
}

export function getTweets(){
    return db.collection('tweets')
}