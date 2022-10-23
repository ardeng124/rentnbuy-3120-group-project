const Items = require('../models/item')
const User = require('../models/user')
const Auth = require('./auth')
const Util = require('./util')
const uploadMiddleware = require('../controllers/middlewares/upload')
const Config = require('../config')
const getItems = async (request, response) => {
    const username = await Util.getDecodedToken(Util.getToken(request)).username
    let id = request.params.id;
    let user;
    let items;  
    if(id){
        items = await Items.find({
            "_id":id
        })
        user =  await User.findOne({id:items.creatorId})
        const usrObj = {
            'username':user.username,
            'id': user.id,
            'firstName':user.firstName,
            'lastName':user.lastName,
        }

        if(username) {
            const user = await User.findOne({username:username})
            let isFavourited = false
            user.favourites.forEach(x => {if(x._id == id) {
                isFavourited= true
                response.status(200).json({items,usrObj,isFavourited})
            }})
            if(!isFavourited){
                response.json({items,usrObj})
            }
        } else {
            response.json({items,usrObj})
        }
    } else {
        items = await Items.find({})
        response.json({items})

    }
    
}

const searchItems = async (request, response) => {

    let query = request.body.query

    let items;
    if(query){
        items = await Items.find({
            "name": { $regex: query, $options: "i" } 
        })
    }else {
        items = await Items.find({})
    }
    response.json({items})
}

const addItems = async(request, response) =>{
    const body = request.body 
    const username = await Util.getDecodedToken(Util.getToken(request)).username
    const userFind = await User.findOne({username:username})
    const item = new Items({
        name: body.name,
        rating: body.rating,
        price: body.price, 
        isAvailable: true,
        creatorId: userFind,
        location: body.location, 
        AgeRating: body.ageRating, 
        description: body.description, 
        timestamp: new Date(),
        imageURL: `http://localhost:8102/api/downloadFile/${request.file.filename}`

    })
    const savedItem = await item.save()

    const decodedToken = Util.getDecodedToken(Util.getToken(request));

    const userPush = await User.findByIdAndUpdate(
        decodedToken.id,
        {"$push" : {"myItems": item.id}}
    )

    response.json(savedItem)
}

const addPhotoToItem = async(request, response) =>{
    if(!request.params.itemId){
        return response.json({message:"missing itemid"}).sendStatus(400)
    }
    try{
        await uploadMiddleware(request, response)
    }catch(error){
        response.json({message:"Image upload failed"}).sendStatus(500)
    }
    const item = await Items.findById(request.params.itemId)
    item.itemPhotoUrl = `${Config.downloadURL}${request.file.filename}`
    console.log(Config.downloadURL)
    return response.json(await item.save())
}
module.exports = {
    getItems, 
    addItems,
    searchItems,
    addPhotoToItem
}