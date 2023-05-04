import express from 'express';
import http from 'http';
import * as tweetController from '../controller/tweet.js'
import { body } from 'express-validator';
import { validate } from '../middleware/validators.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({min:4})
        .withMessage('text는 최소 4자 이상 입력하세요!'),
    validate
]
router.get('/', isAuth, tweetController.getTweets)


// GET
// /tweets/:id (id로 데이터 찾기)
router.get('/:id', isAuth, tweetController.getTweetsById)


//text가 4자 이하인 경우 에러 처리!(POST, PUT에 대해)
//POST (tweets에 데이터 추가)
//id:Date.now().toString()
router.post('/', isAuth, validateTweet, tweetController.createTweet)
// router.post(
//     '/', 
//     [
//         body('text').trim().isLength({min:4}).withMessage('4글자 이상 입력하세요!')
//     ],
//     tweetController.createTweet
// )


//PUT(text만 수정)
// id를 찾아 body에 수정된 text를 넘김
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet)
// router.put(
//     '/:id', 
//     [
//         body('text').trim().isLength({min:4}).withMessage('4글자 이상 입력하세요!')
//     ],
//     tweetController.updateTweet);

//DELETE
// 삭제할 id를 찾아 데이터 삭제
router.delete('/:id', isAuth, tweetController.deleteTweet)

export default router;