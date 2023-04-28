import express from 'express';
import http from 'http';

let tweets = [
    {
        id:'1',
        text:'첫 트윗입니다.',
        createdAt: Date.now().toString(),
        name: 'Apple',
        username: '김사과',
        url: ''
    },
    {
        id:'2',
        text:'안녕하세요.',
        createdAt: Date.now().toString(),
        name: 'Banana',
        username: '반하나',
        url: ''
    }
];
const router = express.Router();

// GET
// /tweets?username=:username (username으로 찾기!)
//          ----key   -----value
router.get('/', (req, res, next)=> {
    const username = req.query.username;
    // db에 있는 username을 받을 수 있음
    const data = username
        // tweet.username === username에 true인 요소들이 배열로 반환됨
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets;
    res.status(200).json(data);
})


// GET
// /tweets/:id (id로 데이터 찾기)
router.get('/:id', (req, res, next)=> {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id ${id} not found😭`})
    }
})


//POST (tweets에 데이터 추가)
//id:Date.now().toString()
router.post('/', (req, res, next) => {
    // console.log(req.body)

    // const data = {
    //     id:Date.now().toString(),
    //     text:'내용을 추가합니다',
    //     createdAt: Date.now().toString(),
    //     name: 'Orange',
    //     username: '오렌지',
    //     url: ''
    // }
    // res.status(201).send(data)

            // 해당 키에 대한 이름이 같아야함!
    const { text, name, username } = req.body;
    const tweet = {
        id:Date.now().toString(),
        text,     // text:text(같으면 생략가능),  
        createdAt: Date.now().toString(),
        name,     //name:name,
        username
    }
    tweets = [tweet, ... tweets] // tweet을 tweets에 포함시켜서 가리키게함(복사) 
    res.status(201).json(tweet)

})

//PUT(text를 수정)
// id를 찾아 body에 수정된 text를 넘김
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet)=> tweet.id === id)
    if (tweet){
        tweet.text = text;
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id ${id} not found😭`})
    }
})

//DELETE
// 삭제할 id를 찾아 데이터 삭제
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== id)   // filter()을 이용하여 삭제할 id의 내용만 빼고 tweets에 담음!
    res.sendStatus(204);  
})
export default router;