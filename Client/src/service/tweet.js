// 기존에 있던 tweets배열을 삭제함
export default class TweetService {
  constructor(http, tokenStorage){
    this.http = http;  
    this.tokenStorage = tokenStorage;  // token 추가
  }

  // 네트워크를 통해 데이터 가져오기

  async getTweets(username) {
    // 네트워크 연결 후 fetch를 통해 /tweets?username=:username 
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {     //username이 apple이라면 ?username=apple, 없으면 ?username
      mehtod:"GET",
      headers: this.getHeaders()
    })
  }

  async postTweet(text) {
    // fetch를 통해 /tweets post로 입력한 데이터를 전송
    return this.http.fetch(`/tweets`,{
      method:"POST",
      headers: this.getHeaders(),
      body: JSON.stringify({text, username:'김사과', name:'apple'})
    })
  }

  async deleteTweet(tweetId) {
    // const response = await fetch('/tweets/${tweetId}', {
    //   method:"DELETE"
    // })

    // this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    return this.http.fetch(`/tweets/${tweetId}`, {
      method:"DELETE",
      headers: this.getHeaders()
    })
  }

  async updateTweet(tweetId, text) {
    // const url = '/tweets/${tweetId}'
    // const options = {
    //   method:"PUT",
    //   headers:{
    //     'Content-Type':'application/json',
    //     'Accept':'application/json',
    //   },
    //   body:JSON.stringify({text}),
    // }

    // const response = await fetch(url, options);
    // const data = await response.json();

    // // const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    // if (!response) {
    //   throw new Error('tweet not found!');
    // }
    // return data

    return this.http.fetch(`/tweets/${tweetId}`, {
      method:"PUT",
      headers: this.getHeaders(),
      body:JSON.stringify({text})
    })
  }

  getHeaders(){
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`
    }
  }
}
