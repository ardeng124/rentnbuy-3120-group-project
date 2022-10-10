import axios from "axios"

const serverUrl = "http://localhost:8102/"

var token = ""
var username = ""

const getUserName = () => {
    username = localStorage.getItem('username')
    return username
}
//warning: avoid use
const getToken = () => {
    return token
}
const logOut=() => { 
    localStorage.clear()
    token = ""
    //make cookie instantly expire thus get deleted
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    console.log("Logging Out...")
    return;
}

const validateToken = async () => {
    // token = localStorage.getItem('token')
    token = document.cookie.substring(6)
    const response = await axios.get(serverUrl + "auth/", { headers: { "Authorization": `Basic ${token}` } })

    console.log(response)

    if (response.data.status === "unregistered") {
        return response.data.status
    } else {
        token = response.data.token
        return response.data.status
    }
}

const getItems = async () => {
    const response = await axios.get(serverUrl + "api/items/", { headers: { "Authorization": `Basic ${token}` } })
    return response.data.items
    
}

const login = async (newUser) => {
    //do some stuff with cookies
    const response2 = await axios.post(serverUrl + "auth/login/", newUser)
    token = response2.data.token
    // localStorage.setItem('token',token)
    const expiration_date = new Date()
    var expires = new Date(Date.now() + 86400 * 1000).toUTCString()
    document.cookie = `token=${token}; SameSite=None` + expires + ";path=/;"
    username = response2.data.username;
    localStorage.setItem('username',username)
    return response2
}

const register = async (newUser) => {
    //do some stuff with cookies
    const response2 = await axios.post(serverUrl + "auth/register/", newUser)
    token = response2.data.token
    // localStorage.setItem('token',token)
    const expiration_date = new Date()
    var expires = new Date(Date.now() + 86400 * 1000).toUTCString()
    document.cookie = `token=${token}; SameSite=None` + expires + ";path=/;"
    username = response2.data.username;
    localStorage.setItem('username',username)
    return response2
}

export default {
    validateToken,
    getUserName,
    getToken,
    login,
    logOut,
    register,
    getItems
}