import express from 'express';
import http from 'http';
import * as tweetController from '../controller/tweet.js'

const router = express.Router();

router.get('/', tweetController.getTweets)


// GET
// /tweets/:id (id로 데이터 찾기)
router.get('/:id', tweetController.getTweetsById)

//POST (tweets에 데이터 추가)
//id:Date.now().toString()
router.post('/', tweetController.createTweet)

//PUT(text를 수정)
// id를 찾아 body에 수정된 text를 넘김
router.put('/:id', tweetController.updateTweet);

//DELETE
// 삭제할 id를 찾아 데이터 삭제
router.delete('/:id', tweetController.deleteTweet)

export default router;