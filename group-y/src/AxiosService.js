import axios from "axios"

// const serverUrl = "https://comp3120-chat.herokuapp.com/"
// const serverUrl = "http://localhost:8102/"
const serverUrl = "http://localhost:8102/"

var token = ""
var username = ""

const getUserName = () => {
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
    console.log(token)
    const response = await axios.get(serverUrl + "auth/", {
        headers: { Authorization: `Basic ${token}` },
    })
    console.log(response)

    if (response.data.status === "unregistered") {
        return response.data.status
    } else {
        token = response.data.token
        username = response.data.username
        return response.data.status
    }
}
//STUMP FOR FUTURE REFACTOR
const login = (inToken) => {
    token=inToken
}
// const registerUser = async (newUser) => {
    
//     //do some stuff with cookies
//     const response2 = await axios.post(serverUrl + "auth/register/", {
//         username: username,
//         password: password,
//     })
//     token = response2.data.token
//     // localStorage.setItem('token',token)
//     const expiration_date = new Date()
//     var expires = new Date(Date.now() + 86400 * 1000).toUTCString()
//     document.cookie = `token=${token}; SameSite=None` + expires + ";path=/;"
//     localStorage.setItem("username", response.data.username)

//     return response2.data.status
// }

// const createNewUser = (newUser) => {
//     axios
//         .post("http://localhost:8102/auth/login", newUser, authProfile())
//         .then((response) => {
//             console.log("POST response", response)
//             if (response.data.status === "user does not exist") {
//                 setErrorMessages({
//                     name: "uname",
//                     message: "Your Username or password is incorrect!",
//                 })
//             } else {
//                 console.log("A User has logged in!")
//                 logInTracker = true
//                 setErrorMessages({ name: "uname", message: "" })
//                 localStorage.setItem("token", response.data.token)
//                 localStorage.setItem("username", response.data.username)
//                 navigate("/")
//             }
//         })
// }
export default {
    validateToken,
    // registerUser,
    login,
    logOut
}