import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
// import { Server } from 'socket.io'
import { initSocket } from './connection/socket.js'
// import { db } from './db/database.js'

const app = express()

//미들웨어 
app.use(express.json())  
app.use(cors())
app.use(morgan('tiny'))  // 사용자들이 접속하면 log를 콘솔에 찍음(HTTP 요청 로깅을 간단하게 처리하고자 할 때 사용)

// router
app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
})

// db.getConnection().then((connection) => console.log(connection))

// 서버에러
app.use((error, req, res, next) => {
    console.log(error)
    res.sendStatus(500)
})


// express를 사용하여 서버를 기다리는 객체 생성(웹으로도 사용가능)
const server = app.listen(config.host.port)  
initSocket(server);


// // host: {port:parseInt(required('SERVER_PORT'), 8080)}
// const socketIO = new Server(server, {
//     cors: {
//         origin: "*"  // cors에 대한 옵션을 줄 수 있음(모든 사용자에 대해 받을 수 있게)
//     }
// })  // socket io의 객체 생성

// // on():어떤이벤트가 발생했다면 비동기함수를 실행 -> connection(사용자와 연결)이 발생했을 때 다음 함수를 실행
// socketIO.on('connection', () => {
//     console.log('클라이언트 연결 성공!')
//     // emit() : socketIO에 접속한 사용자에게 이벤트를 발생시킴
//     socketIO.emit('dwitter', 'Hello❤')  // 클라이언트쪽에 dwitter라는 이벤트가 발생, 그 안에 데이터는 Hello❤
// })  

// //1초마다 사용자에게 dwitter이벤트를 보냄
// setInterval(() => {
//     socketIO.emit('dwitter', 'Hello❤❤❤')
// }, 1000) 
