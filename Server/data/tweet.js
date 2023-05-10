// 데이터와 데이터를 처리하는 로직
// 트윗된 데이터를 가져옴

import * as userRepository from './auth.js'
import { db } from '../db/database.js';

const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id'

const ORDER_DESC = 'order by tw.createdAt desc'

// 전체 데이터 반환
export async function getAll(){
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const { username, name, url } = await userRepository.findById(tweet.userId)
    //         return {...tweet, username, name, url}
    //     } )
    // )
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result) => result[0])
}

// username(회원의 아이디)으로 데이터 반환
export async function getAllByUsername(username){
    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username))
    return db.execute(`${SELECT_JOIN} where us.username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0])
}


// id(트윗의 번호)로 데이터 반환
//find(): 배열에서 원하는 값을 찾는 데 사용
export async function getById(id){
    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found) {
    //     return null;
    // }
    // const {username, name, url} = await userRepository.findById(found.userId);
    // return {...found, username, name, url}
    return db.execute(`${SELECT_JOIN} where tw.id=?`, [id])
    .then((result) => result[0][0])  // 해당하는 트윗의 id만 뽑음
}

// Post 
// tweets에 새로운 객체로 생성
export async function create(text, userId){
    return db.execute('insert into tweets (text, createdAt, userId) values (?,?,?)',[text,new Date(), userId])
    .then((result) => console.log(result));
}


// put (tweet의 내용 수정)
// id와 text를 보냄
export async function update(id, text){
    // const tweet = tweets.find((tweet) => tweet.id === id)
    // if(tweet){
    //     tweet.text = text;
    // }
    // return tweet
    return db.execute('update tweets set text=? where id=?', [text, id])
    .then(() => getById(id))
}

//delete
//id로 지우고싶은 tweet 지움
export async function remove(id){
    // tweets = tweets.filter((tweet) => tweet.id !== id)
    return db.execute('delete from tweets where id=?', [id])
}   