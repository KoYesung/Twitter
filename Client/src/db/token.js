const TOKEN = 'token'


export default class tokenStorage {
    //토큰을 저장
    saveToken(token){
        // localStorage :웹 브라우저에서 제공하는 클라이언트 사이드 스토리지 기능
        localStorage.setItem(TOKEN, token)
    }

    //저장된 토큰을 가져옴
    getToken(){
        return localStorage.getItem(TOKEN)

    }

    //로그아웃을 했을때 토큰이 모두 삭제
    clearToken(){
        localStorage.clear(TOKEN)
    }
}