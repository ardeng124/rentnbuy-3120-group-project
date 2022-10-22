const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')
const Util = require('./util')

const User = require('../models/user')

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
    const passwordHash = await Util.hashPassword(body.password)
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
        rentedItems: [],
        items: [],
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

const getDecodedToken = (token) => {
    return jwt.verify(token, process.env.SECRET)
}

//Get User Account Details
const getUserDetails = async (request, response) => {

    let decodedToken = getDecodedToken(getToken(request))

    if (decodedToken) {

        const username = decodedToken.username

        try {
            console.log("i am here", username)
            // this will throw an error if token isn't of the right format
            const match = await User.findOne({username: username})
                            .populate("rentedItems")
                             .populate("boughtItems")
                             .populate("myItems")

            if (match) {
                return response.json(
                {
                    status: "success",
                    _id: match._id,
                    firstName: match.firstName, 
                    lastName: match.lastName,
                    username: match.username,
                    emailAddress: match.emailAddress,
                    location: match.location,
                    rentedItems: match.rentedItems,
                    boughtItems:match.boughtItems,
                    myItems: match.myItems,
                    profilePhoto: match.profilePhotoLocation
                })       
            }else{
                return response.sendStatus(400)
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
    const token = getToken(request)
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({status:"unregistered"})
        }else{
            return  response.status(200).json({status:"success"})
        }
    }catch(err){
        return response.status(401).json({status:"unregistered"})
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

/**
 * Change the password. Needs newPassword and currentPassword 
 * @param {username, password, newPassword} request 
 * @param {HTTPStatus} response 
 * @returns 
 */
const changeUserPassword = async (request, response) => {
    const {password, newPassword} = request.body
    const username = Util.getDecodedToken(Util.getToken(request)).username
    const user = await User.findOne({username:username})
    if(!user){
        return response.status(400).json({"status": "Something went wrong"})
    }
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if(!passwordCorrect){
        return response.status(401).json({"status": "Old password does not match"})
    }
    user.passwordHash = await Util.hashPassword(newPassword)
    await user.save()
    return response.status(200).json({status:"password changed"})
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
