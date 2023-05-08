export default class HttpClient {
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    
    // 모든 네트워크 형태는 async를 붙여 비동기처리를 하는 것이 좋음
    //http에서 fetch메소드를 사용하려면 2개의 변수를 받아라
    async fetch(url, options) { 
        console.log(`${this.baseURL}${url}`) 
        const res = await fetch(`${this.baseURL}${url}`, {   // http://localhost:8080 + fetch로 가져온url
            ...options,   // options 복사
            headers:{
                'Content-Type':'application/json',
                ...options.headers
            }
        })  
        let data;
        try{
            data = await res.json()
        }catch(error){
            console.error(error);
        }
        // 200번대는 정상처리(그 외는 정상적인 처리가 아님!)
        if(res.status > 299 || res.status < 200){
            const message = data && data.message ? data.message : "문제가 발생하였습니다!😭";
            throw new Error(message);
        }
        return data;   
    }

    // jwt로 데이터를 받아오는 함수
    

}