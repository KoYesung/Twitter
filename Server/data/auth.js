import { getUsers } from '../db/database.js';
import  * as MongoDb  from 'mongodb'
const ObjectID = MongoDb.ObjectId;  //ObjectId: 데이터를 넣으면 자동으로 특정한 key값이 생김 

// {
//     acknowledged: true,
//     insertedId: new ObjectId("645d982ba2c2ffa15dd17493")  // ObjectId
//   }

/*
    MongoDb의 특징 
    { ... }
    { userid: 'apple', name: '김사과'} 
    { userid: 'apple', name: '김사과'}
    일 때, 하나만 지울 수 없음(특정한 key값이 없음)
*/


export async function findByUsername(username){
    return getUsers().find({username})  // 전달받은 username을 찾아 콜렉션에서 데이터를 하나만 찾아줌
    .next()    // 위에 코드가 처리되면 아래로 연결하기 위해 작성(그냥 then()만 쓰면 무조건 실행됨)
    .then(mapOptionalUser)  
}

//회원가입
export async function createUser(user){
    // collection을 먼저 선택함(getUsers()) -> 메서드 사용
    return getUsers().insertOne(user)  // 전달된 user객체를 객체전체로 데이터를 저장
    .then((result) => {
        console.log(result);
        // result.ops[0]._id.toString()
    })
}

export async function findById(id){
    return getUsers().find({ _id: new ObjectID(id) })  // 전달받은 id를 ObjectID 객체로 만든 _id를 찾아 반환
    .next()
    .then(mapOptionalUser)
}

function mapOptionalUser(user){
    return user 
    ? { ...user, id: user._id.toString() }  // user객체가 있다면 user객체를 복사한 새로운 객체로 만들고 _id 필드를 str로 변환하고 추가하여 반환
    : user;  // 없다면 undefined인 user이 반환
}