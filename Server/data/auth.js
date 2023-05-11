import SQ from 'sequelize'
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes; // 데이터 형식을 지정해줄 수 있음
import moment from 'moment-timezone';


// users 테이블을 만들어주는 객체
export const User = sequelize.define(
    // 테이블 이름 설정 - user라고 만들면 users라고 생김(s가 붙여짐!)
    'user',  // users라는 테이블이 있으면 만들어지지 않고 기존에 있던 users 테이블을 가리키게 됨
    {   
        //첫번째 컬럼
        id: {
            type: DataTypes.INTEGER,  // 데이터형식이 int
            autoIncrement: true,      
            allowNull: false,
            primaryKey: true
        },
        username: {
            type:DataTypes.STRING(45),   // 데이터타입이 str(45글자)
            allowNull:false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type:DataTypes.STRING(45),
            allowNull:false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull:false
        },
        url: {type:DataTypes.TEXT},
        // regdate: 날짜타입, 현재 시간을 자동으로 등록
        regdate: {
            type:DataTypes.DATE,
            defaultValue: moment.tz(Date.now(), "Asia/Seoul")
        }
    },
    // option - defalt 값에 줄 값을 지정
    { timestamps: false }
)

export async function findByUsername(username){
    // findOne(): User 테이블에서 데이터를 한개만 찾을 때
    // where: where절
    // username 필드 에서 주어진 username 인 것 (username:username)
    return User.findOne({where: {username}})
}

export async function createUser(user){
    // user객체 데이터를 받아 id에 따라 dataValues를 통해 데이터를 입력하게 함
    return User.create(user).then((data) => data.dataValues.id)
}

export async function findById(id){
    //User테이블에서 PK값(id임)을 찾음
    return User.findByPk(id);
}