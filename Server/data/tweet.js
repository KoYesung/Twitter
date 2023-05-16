// 데이터와 데이터를 처리하는 로직
// 트윗된 데이터를 가져옴
import Mongoose from 'mongoose';
import { userVirtualId } from '../db/database.js';
import * as UserRepository from './auth.js'  // 사용자 정보 가져옴

const tweetSchema = new Mongoose.Schema({
    text: {type: String, required: true},    //required: 해당 필드의 값이 필수인지 여부
    userId: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    url: String,   // 자바스크립트는 마지막요소에 컴마(,)있어도 관계없음
},
{ timestamp: true}   // createdAt, updatedAt 생김
)


userVirtualId(tweetSchema)
const Tweet = Mongoose.model('Tweet', tweetSchema)  // Tweets로 만들어짐


// 전체 데이터 반환
export async function getAll() {
    return Tweet.find().sort({ createdAt: -1 })   // -1: 내림차순
}

// username(회원의 아이디)으로 데이터 반환
export async function getAllByUsername(username) {
    return Tweet.find({ username }).sort({ createdAt: -1 })
}

// id(트윗의 번호)로 데이터 반환
export async function getById(id) {
    return Tweet.findById(id)  // id는 1개만 데이터가 나오기때문에 정렬할 필요x
}

// Post 
// tweets에 새로운 객체로 생성
export async function create(text, userId) {
    // UserRepository에서 userId로 찾은 user객체반환
    return UserRepository.findById(userId)
        .then((user) => new Tweet({
            text,
            userId,
            name: user.name,
            username: user.username
        }).save()
        )
}


// put (tweet의 내용 수정)
// id와 text를 보냄
export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal:false })  //returnOriginal:false -> 업데이트 이전의 원본 문서를 반환하지 않도록 설정
}

//delete
//id로 지우고싶은 tweet 지움
export async function remove(id) {
    return Tweet.findByIdAndDelete(id)
}   