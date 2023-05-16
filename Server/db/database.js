import { config } from '../config.js'; 
import Mongoose from 'mongoose';

let db;  // 전역변수로 설정
// DB와 연결하는 함수
export async function connectDB(){
    // Mongodb
    // return MongoDb.MongoClient.connect(config.db.host)
    // .then((client) => {
    //     db = client.db()
    // })

    //Mongoose
    return Mongoose.connect(config.db.host);
}


export function userVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString()
    })
    schema.set('toJSON', { virtuals: true})    //데이터를 내보낼 때는 JSON
    schema.set('toObjext', { virtuals: true})  // 내가 데이터를 다룰때는 Object로 셋팅함
}



//collection을 리턴해주는 함수
export function getUsers(){
    return db.collection('users')
}

export function getTweets(){
    return db.collection('tweets')
}