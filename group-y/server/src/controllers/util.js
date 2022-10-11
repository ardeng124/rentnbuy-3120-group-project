const jwt = require('jsonwebtoken')

const getToken = (request) => {
    const auhorisation = request.get('Authorization')
    if (auhorisation && auhorisation.toLowerCase().startsWith('bearer ')) {
        return auhorisation.substring(7)
    }
    return null
}
const getDecodedToken = (token) => {
    console.log(token)
    try {
        return jwt.verify(token, process.env.SECRET)
    }catch(error){
        return null
    }
}

module.exports = {
    getToken, 
    getDecodedToken
}