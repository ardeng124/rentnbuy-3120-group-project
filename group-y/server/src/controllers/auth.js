const models = require('../models')

const User = require('../models/user')
const Session = require('../models/session')
/* Create a new session for a user */
const createSession = async (request, response) => {

    const session = new models.Session({
        userId: request.body.username,
    })

    const returned = await session.save()
        .catch((err) => {
            response.json({"status": "username taken"})
        })

    if (returned) {
        if (session._id) {
            response.json({
                status: "success",
                username: returned.username,
                token: returned._id
            })
        }
    }
}

const createUser = async(request, response)  => {
    const body = request.body
    const user = new User ({
        username: body.username, 
        firstName: body.firstName, 
        lastName: body.lastName, 
        passwordHash: body.password, 
        image: "", //TO DO GridFS, 
        age: body.age, 
        isAdmin: false, 
        phoneNumber: body.phoneNumber, 
        emailAddress: body.emailAddress, 
        location: body.location,
    })
    const savedUser = await user.save()
    console.log(savedUser)
    const session = new Session({
        userId: savedUser.id
    })
    const savedSession = await session.save()
    response.status(201).json(savedSession)
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
module.exports = { validUser, getUser, createSession, existingUser, createUser }
