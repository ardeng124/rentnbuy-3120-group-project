const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')

const User = require('../models/user')
const Session = require('../models/session')

/**
 * Creates a new user and establishes a new session for the user
 * @param {request} request 
 * @param {response} response 
 */
const createUser = async(request, response)  => {
    const body = request.body
    const existingUser = await User.findOne({
        "username":body.username
    })
   
    if(existingUser){
        return response.json({
            error: 'username taken',
            status: 409
          })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User ({
        username: body.username, 
        firstName: body.firstName, 
        lastName: body.lastName, 
        passwordHash: passwordHash, 
        image: "", //TO DO GridFS, 
        age: body.age, 
        birthday: body.birthday,
        gender: body.gender,
        isAdmin: false, 
        phoneNumber: body.phoneNumber, 
        emailAddress: body.emailAddress, 
        location: body.location,
    })
    const savedUser = await user.save()
    const userForToken = {
        username: savedUser.username,
        id: user.id,
    }
    // generate a token for the registered user 
    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
}

const loginUser = async(request, response) => {
    const {username, password} = request.body
    const user = await User.findOne({username})
    console.log(user)
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.json({
            error: 'user does not exist',
            status: 401
          })
    }
    const userForToken = {
        username: user.username,
        id: user.id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response
    .status(200)
    .send({ token, username: user.username, name: user.name })
}

// const getUser = async (request, response) => {

//     const authHeader = request.get('Authorization')
//     if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
//         const token = authHeader.substring(7)
//         try {
//             // this will throw an error if token isn't of the right format
//             const match = await models.Session.findOne({token: token})  
//             if (match) {
//                 response.json({
//                     status: "success",
//                     username: match.username,
//                     token: match._id
//                 })       
//             }
//         } catch { }

//     }
//     response.json({status: "unregistered"}) 
// }

const getDecodedToken = (token) => {
    return jwt.verify(token, process.env.SECRET)
}

//Get User Account Details
const getUserDetails = async (request, response) => {

    // let result = await validUser(request)

    let decodedToken = getDecodedToken(getToken(request))

    if (decodedToken) {

        const username = decodedToken.username

        try {
            // this will throw an error if token isn't of the right format
            const match = await User.findOne({username: username})
            if (match) {
                response.json(
                {
                    status: "success",
                    _id: match._id,
                    firstName: match.firstName, 
                    lastName: match.lastName,
                    username: match.username,
                    emailAddress: match.emailAddress,
                    location: match.location
                })       
            }
        } catch {
            response.sendStatus(401)
        }
    }
}

/* 
 * validUser - check for a valid user via Authorization header
 *   return the username if found, false if not
*/
const validUser = async (request, response) => {
    // const token = getToken(request)
    const authHeader = request.get('Authorization')

    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        const token = authHeader.substring(7)
        try{
            const decodedToken = jwt.verify(token, process.env.SECRET)
            if (!decodedToken.id) {
                return response.json({status: "unregistered"})
            }else{
                return response.json({status: "success" })
            }
        }catch(err){
            return response.json({status: "unregistered"})
        }
    return response.json({status: "unregistered"})
}
}

//Extended Functionality (Users can log in with exisiting credentials)
const existingUser = async (request, response) => {
    //Storing the username and password from the request body
    const { username, password } = request.body

    //Find a match on 'username' and 'password'
    const matchExistingUser = await models.Session.findOne({ username, password })

    console.log("Hi", matchExistingUser)

    //If the user 'username' and 'password' matches an exisiting entry
    //then it will be true
    if (matchExistingUser) {
        response.json({
            status: "success",
            username: matchExistingUser.username,
            token: matchExistingUser._id
        })
    //Username and/or password do not match any of the entries in the database
    } else {
        response.json({status: "user does not exist"})
    }
}

const getToken = (request) => {
    const auhorisation = request.get('Authorization')
    if (auhorisation && auhorisation.toLowerCase().startsWith('bearer ')) {
        return auhorisation.substring(7)
    }
    return null
}

const editAccountDetails = async (request, response) => {
    const userId = request.body._id
    const emailAddress = request.body.emailAddress
    const location = request.body.location
    const user = await User.findOne({_id: userId})

    if (user) {
        const result = await User.findOneAndUpdate({_id: userId}, {emailAddress: emailAddress})
        const result2 = await User.findOneAndUpdate({_id: userId}, {location: location})
        if (result.acknowledged || result2.acknowledged) {
            //Authorised to edit
            response.json({status: 'success'})
        } else {
            //Not authorised to edit
            response.json({status: 'User correct but failed'})
        }
    } else {
        // Not authorised to edit 
        response.json({status: 'not authorised to edit'})
    }
}

//Change Password - Not Implemented Yet
const changeUserPassword = async (request, response) => {
    const {username, password} = request.body
    const user = await User.findOne({username})
    console.log(user)
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid password'
        })
    }
}

//Exporting all the functions
module.exports = { 
    validUser, 
    existingUser, 
    createUser, 
    loginUser, 
    editAccountDetails, 
    getUserDetails, 
    changeUserPassword 
}
