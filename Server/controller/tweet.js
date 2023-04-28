// 모델과 뷰를 연결하는 역할

import * as tweetRepository from '../data/tweet.js'

// username으로 데이터 찾기
export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

// id로 데이터 찾기
export async function getTweetsById(req, res){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id ${id} not found😭`})
    }
}

// Post
export async function createTweet(req, res){
    const { text, name, username } = req.body;
    const tweet = await tweetRepository.create(text, name, username)
    res.status(201).json(tweet)
}


//Put
export async function updateTweet(req, res){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text)
    if (tweet){
        
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id ${id} not found😭`})
    }
}

//Delete
export async function deleteTweet(req, res, next){
    const id = req.params.id;
    await tweetRepository.remove(id)
    res.sendStatus(204);  
    
}