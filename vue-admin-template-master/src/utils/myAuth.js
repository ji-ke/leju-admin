const TokenKey = 'admin-token'
const userInfo = 'admin-user'
//token operation
export function getToken() {
   return window.localStorage.getItem(TokenKey)
}
  
export function setToken(token) {
    window.localStorage.setItem(TokenKey,token)
}

function removeToken() {
    window.localStorage.removeItem(TokenKey)
}

//userinfo operation
export function getUserInfo() {
    let userInfoStr = window.localStorage.getItem(userInfo)
    return JSON.parse(userInfoStr)
    // console.log(JSON.parse(userInfoStr))
}
  
export function setUserInfo(userinfo) {
    let userInfoStr = JSON.stringify(userinfo) 
    // console.log(userInfoStr)
    if (userInfoStr) {
        window.localStorage.setItem(userInfo,userInfoStr)
    } else {
        return null
    }
}

function removeUserInfo() {
    window.localStorage.removeItem(userInfo)
}

//clear localstorage
export function clearLs() {
    removeToken()
    removeUserInfo()
}


