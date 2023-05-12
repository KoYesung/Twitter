// 데이터와 데이터를 처리하는 로직
// 트윗된 데이터를 가져옴
import MongoDb from 'mongodb'
import { getTweets } from '../db/database.js';
import * as UserRepository from './auth.js'  // 사용자 정보 가져옴

const ObjectId = MongoDb.ObjectId;

/*
MongoDb : NoSQL(스키마 없음, 중복된데이터가 들어갈 수있음, 하지만 조회나 출력에 있어서 속도가 굉장히 빠름) -> 스키마를 만들수 있는 라이브러리를 사용하면 Relational하게 사용할 수 있음
하지만 굳이 NoSQl의 특징을 죽여가면서 사용할 이유가 없음!
*/

//tweet이 있으면 tweet객체를 복사한 새로운 객체로 만들고 _id 필드(ObjectId)를 str로 변환 후 추가하여 반환
function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

//여러개의 tweets를 배열로 map해서 보여주는 함수
function mapTweets(tweets){
    return tweets.map(mapOptionalTweet)
}

// 전체 데이터 반환
export async function getAll() {
    return getTweets().find()
        .sort({ createdAt: -1 })    // -1은 내림차순, 1은 오름차순
        .toArray()
        .then(mapTweets)
}

// username(회원의 아이디)으로 데이터 반환
export async function getAllByUsername(username) {
    return getTweets().find({username})
    .sort({createdAt:-1})
    .toArray()
    .then(mapTweets)
}

// id(트윗의 번호)로 데이터 반환
export async function getById(id) {
    return getTweets().find({_id: new ObjectId(id)})   // 전달받은 id를 ObjectId처럼 만들기 위해 Object화
    .next()
    .then(mapOptionalTweet)
}

// Post 
// tweets에 새로운 객체로 생성
export async function create(text, userId) {
    // UserRepository에서 userId로 찾은 user객체반환
    return UserRepository.findById(userId)
        .then((user) => getTweets().insertOne({
            text,
            createdAt: new Date(),
            userId,
            name: user.name,    // user객체에서 필요한 정보만 뽑아서 같이 출력할 수 있음
            username: user.username,
            url: user.url
        }))
        .then((result) => console.log(result))
        .then(mapOptionalTweet)
}


// put (tweet의 내용 수정)
// id와 text를 보냄
export async function update(id, text) {
    return getTweets().findOneAndUpdate(
        {_id: new ObjectId(id)},
        { $set: {text}},
        {returnOriginal: false}
    )
    .then((result) => result.value)
    .then(mapOptionalTweet)
}

//delete
//id로 지우고싶은 tweet 지움
export async function remove(id) {
    getTweets().deleteOne({_id: new ObjectId(id)})
}   