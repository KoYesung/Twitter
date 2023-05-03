// 데이터와 데이터를 처리하는 로직

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
// 전체 데이터 반환
export async function getAll(){
    return tweets;
}

// username으로 데이터 반환
export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username === username)
}

// id로 데이터 반환
//find(): 배열에서 원하는 값을 찾는 데 사용
export async function getById(id){
    return tweets.find((tweet) => tweet.id === id)
}

// Post 
// tweets에 새로운 객체로 생성
export async function create(text, name, username){
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets]
    return tweets
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