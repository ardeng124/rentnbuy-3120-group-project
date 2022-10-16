import axios from "axios"

const serverUrl = "http://localhost:8102/"

var token = ""
var username = ""

const getUserName = () => {
    username = localStorage.getItem('username')
    return username
}

const getToken = () => {
    token = document.cookie.substring(6)
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
    const response = await axios.get(serverUrl + "auth/", { headers: { "Authorization": `Bearer ${token}` } })

    console.log(response)

    if (response.data.status === "unregistered") {
        return response.data.status
    } else {
        token = response.data.token
        return response.data.status
    }
}

const getItems = async () => {
    const response = await axios.get(serverUrl + "api/items/", { headers: { "Authorization": `Bearer ${token}` } })
    return response.data.items
    
}

const login = async (newUser) => {
    //do some stuff with cookies
    const response2 = await axios.post(serverUrl + "auth/login/", newUser)
    if (response2.data.status == 401){

            return response2
    }

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
    if (response2.data.status == 409){
        console.log("aaa")
        return response2
    }
    token = response2.data.token
    // localStorage.setItem('token',token)
    const expiration_date = new Date()
    var expires = new Date(Date.now() + 86400 * 1000).toUTCString()
    document.cookie = `token=${token}; SameSite=None` + expires + ";path=/;"
    username = response2.data.username;
    localStorage.setItem('username',username)
    return response2
}

const getUserDetails = async () => {
    const response = await axios.get(serverUrl + "auth/getUserDetails/",{ headers: { "Authorization": `Bearer ${token}` } })
    return response
}

const getItemDetails = async (itemId) => {
    const response = await axios.get(serverUrl + "api/items/" + itemId, { headers: { "Authorization": `Bearer ${token}` } })
    return response
}

const editUserDetails = async (details) => {
    const response = await axios.put(serverUrl + "auth/edit/", details, { headers: { "Authorization": `Bearer ${token}` } })
    return response
}

const searchItems = async (query) => {

    const response = await axios.post(serverUrl + "api/search", {'query':query}).catch((error) => {
        return error.response.data.error
      })
    return response

}

const rentAnItem = async (itemId) => {
    getToken()
    console.log(token)
    const response = await axios.post(serverUrl + "api/rent/" + itemId, itemId, { headers: { "Authorization": `Bearer ${token}` } })
    console.log(response)
    return response
}

export default {
    validateToken,
    getUserName,
    getToken,
    login,
    logOut,
    register,
    getItems,
    getItemDetails,
    getUserDetails,
    editUserDetails,
    searchItems,
    rentAnItem
}