import Mongoose from 'mongoose';
import { userVirtualId } from '../db/database.js';

//schema 만들기
const userSchema = new Mongoose.Schema({
    username: {type:String, required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    url: String
})

userVirtualId(userSchema)
const User = Mongoose.model('User', userSchema)  // 'Users'라는 이름으로 만들어지고 userSchema 형식으로 collection을 만듦


export async function findByUsername(username){
    return User.findOne({ username })
}

//회원가입
export async function createUser(user){
    return new User(user).save().then((data) => data.id)  // user객체를 User콜렉션에 추가하고 해당 user객체의 _id(가상의 id)를 반환
}

export async function findById(id){
    return User.findById(id)
}

