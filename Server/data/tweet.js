// 데이터와 데이터를 처리하는 로직

import * as userRepository from './auth.js'


let tweets = [
    {
        id:'1',  // tweet 글 번호
        text:'첫 트윗입니다.',
        createdAt: Date.now().toString(),  
        userId:'1'   // 해당 계정에 대한 identity한 값
    },
    {
        id:'2',
        text:'안녕하세요.',
        createdAt: Date.now().toString(),
        userId:'1'   // 해당 계정에 대한 identity한 값
    }
];
// 전체 데이터 반환
export async function getAll(){
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await userRepository.findById(tweet.userId)
            return {...tweet, username, name, url}
        } )
    )
}

// username으로 데이터 반환
export async function getAllByUsername(username){
    return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username))
}

// id로 데이터 반환
//find(): 배열에서 원하는 값을 찾는 데 사용
export async function getById(id){
    const found = tweets.find((tweet) => tweet.id === id)
    if(!found){
        return null
    }
    const { username, name, url } = await userRepository.findById(found.userId)  //../data/auth.js
    return {...found, username, name, url}
}

// Post 
// tweets에 새로운 객체로 생성
export async function create(text, userId){
    const tweet = {
        id: Date.now().toString(),  // tweet id
        text,
        createdAt: new Date(),
        userId
    }
    tweets = [tweet, ...tweets]
    return getById(tweet.id)  // tweet의 id만 뽑아 return
}

// put
// id와 text를 보냄
export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        tweet.text = text;
    }
    return tweet
}

//delete
//id로 지우고싶은 tweet 지움
export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id)
}