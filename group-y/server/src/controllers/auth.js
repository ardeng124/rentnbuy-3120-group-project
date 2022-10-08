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
    console.log("request", request)
    const body = request.body
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
        return response.status(401).json({
          error: 'invalid username or password'
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
const getUser = async (request, response) => {

    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)
        try {
            // this will throw an error if token isn't of the right format
            const match = await models.Session.findById(token)  
            if (match) {
                response.json({
                    status: "success",
                    username: match.username,
                    token: match._id
                })       
            }
        } catch { }

    }
    response.json({status: "unregistered"}) 
}

/* 
 * validUser - check for a valid user via Authorization header
 *   return the username if found, false if not
*/
const validUser = async (request) => {
    
    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)        
        const match = await models.Session.findOne({_id: token})  

        if (match) {
            return match._id
        }
    } 
    return false
}

//Extended Functionality (Users can log in with exisiting credentials)
const existingUser = async (request, response) => {
    //Storing the username and password from the request body
    const { username, password } = request.body

    //Find a match on 'username' and 'password'
    const matchExistingUser = await models.Session.findOne({ username, password })

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

//Exporting all the functions
module.exports = { validUser, getUser, existingUser, createUser, loginUser }
