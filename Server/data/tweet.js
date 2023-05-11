// 데이터와 데이터를 처리하는 로직
// 트윗된 데이터를 가져옴
import SQ, { Sequelize } from 'sequelize'
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes; // 데이터 형식을 지정해줄 수 있음

const INCLUDE_USER = {
    // select 뒤에 보고싶은 필드만 적듯이 attributes에 보고싶은 애들만 적어줌
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        // users 테이블에 있는 요소들 -> 한단계 안에 있는 요소들을 한단계 밖으로 꺼냄
        [Sequelize.col('user.name'), 'name'],   // name으로 지정
        [Sequelize.col('user.username'), 'username'],  // username으로 지정
        [Sequelize.col('user.url'),'url']     // url으로 지정
    ],
    include : {
        model: User,
        attributes: [],    // 위에서 작성한 attributes를 포함하여 보낸다
    }
}


const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

export const Tweet = sequelize.define(
    'tweet',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        } 
    }
    // { timestamps: false }   false로 하면 createdAt, updatedAt이 안생김
)
// User 테이블과 join
Tweet.belongsTo(User)

// 전체 데이터 반환
export async function getAll(){
    // ...INCLUDE_USER 계속 사용할 객체 -> 복사해서 넣음
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC})
}

// username(회원의 아이디)으로 데이터 반환
export async function getAllByUsername(username){
    return Tweet.findAll({
        ...INCLUDE_USER, 
        ...ORDER_DESC,
        include: {
            ...INCLUDE_USER.include,
                where: {username}   // username:username인 것을 확인해서 조회
        }})
}


// id(트윗의 번호)로 데이터 반환
//find(): 배열에서 원하는 값을 찾는 데 사용
export async function getById(id){
    return Tweet.findOne({
        where:{id},   // where절이 무조건 먼저 나와야함, 조인했을때 어떤 테이블에서 찾는지는 다음에 작성)
        ...INCLUDE_USER 
    })
}

// Post 
// tweets에 새로운 객체로 생성
export async function create(text, userId){
    return Tweet.create({text, userId}).then((data) => {
        console.log(data)
        return data
    })
}


// put (tweet의 내용 수정)
// id와 text를 보냄
export async function update(id, text){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save()  // 새로운  tweet 객체를 저장함
    })
}

//delete
//id로 지우고싶은 tweet 지움
export async function remove(id){
    return Tweet.findByPk(id).then((tweet) => {
        tweet.destroy()   // 아이디로 찾은 해당 tweet을 삭제함
    })
}   