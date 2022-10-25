import axios from "axios"

const serverUrl = "http://localhost:8102/"

let token = ""
let username = ""

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


    if (response.data.status === "unregistered") {
        return response.data.status
    } else {
        token = response.data.token
        return response.data.status
    }
}

const getItems = async () => {
    if(token){

        const response = await axios.get(serverUrl + "api/items/", { headers: { "Authorization": `Bearer ${token}` } })
        return response.data.items
    } else {
        const response = await axios.get(serverUrl + "api/items/")
        return response.data.items
    }
    
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
    let expires = new Date(Date.now() + 86400 * 1000).toUTCString()
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
    let expires = new Date(Date.now() + 86400 * 1000).toUTCString()
    document.cookie = `token=${token}; SameSite=None` + expires + ";path=/;"
    username = response2.data.username;
    localStorage.setItem('username',username)
    return response2
}

const getUserDetails = async () => {
    getToken()
    const response = await axios.get(serverUrl + "auth/getUserDetails/",{ headers: { "Authorization": `Bearer ${token}` } })
    return response
}

const getItemDetails = async (itemId) => {
    getToken()

    if(token){
        const response = await axios.get(serverUrl + "api/items/" + itemId, { headers: { "Authorization": `Bearer ${token}` } })
        return response
    } else {
        const response = await axios.get(serverUrl + "api/items/" + itemId)
        return response
    }

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

const rentAnItem = async (offer) => {
    getToken()

    const response = await axios.post(serverUrl + "api/makeOffer", offer, { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const getOffersByMe = async () => {
    getToken()
    const response = await axios.get(serverUrl + "api/getOffersByMe", { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const getOffersToMe = async () => {
    getToken()
    const response = await axios.get(serverUrl + "api/getOffersToMe", { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const offerStatus = async(id, status) => {
    const response = await axios.put(serverUrl + "api/approveOffer/"+id , {"status":status}, { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const addFavourite = async(id) => {
    const response = await axios.put(serverUrl + "api/user/favourites" ,{"itemId":id}, { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const modifyFavourite = async(id,action) => {
    getToken()

    const response = await axios.put(serverUrl + "api/user/favourites" ,{"itemId":id, "action":action}, { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const changeUserPassword = async (passwordInfo) => {
    const response = await axios.put(serverUrl + "auth/password/", passwordInfo, { headers: { "Authorization": `Bearer ${token}` } })
    return response
}

const getCategories = async () =>{
    const response = await axios.get(serverUrl + "api/category/")
    return response
}
const postReview = async (review) => {
    getToken()

    const response = await axios.post(serverUrl + "api/reviews", review, { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

const getReviewsPerItem = async () => {
    getToken()
    const response = await axios.get(serverUrl + "api/reviews", { headers: { "Authorization": `Bearer ${token}` } })
    .catch((error) => {
        return "error"
    })
    return response
}

export default {
    getReviewsPerItem,
    postReview,
    changeUserPassword,
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
    rentAnItem,
    getOffersByMe,
    getOffersToMe,
    offerStatus,
    addFavourite,
    modifyFavourite,
    getCategories,
    postReview,
    getReviewsPerItem
}