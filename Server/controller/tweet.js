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
    const { text } = req.body;
    const tweet = await tweetRepository.create(text, req.userId)
    res.status(201).json(tweet)
}


//Put
export async function updateTweet(req, res){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);  // id를 통해 tweet을 불러옴
    // const tweet = await tweetRepository.update(id, text)
    
    if (!tweet){
        res.status(404).json({message: `Tweet id ${id} not found😭`})
    }
    // repository의 userid와 접속해서 요청한 userid가 다르면 에러를 보냄 
    if(tweet.userId !== req.userId){
        return res.sendStatus(403);  // 수정하지 못하도록
    }
    // 위 if문을 통과하면
    // 수정한 tweet
    const updated = await tweetRepository.update(id, text)
    res.status(200).json(updated)
}

//Delete
export async function deleteTweet(req, res, next){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if(!tweet){
        res.status(404).json({message: `Tweet id ${id} not found😭`})
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403);  // 지우지 못하도록
    }
    // 위 if문을 통과하면
    await tweetRepository.remove(id)
    res.sendStatus(204);  
    
}