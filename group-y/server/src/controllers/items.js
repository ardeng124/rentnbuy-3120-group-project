const Items = require('../models/item')
const User = require('../models/user')
const Auth = require('./auth')
const Categories = require('../models/category')

const Util = require('./util')
const uploadMiddleware = require('../controllers/middlewares/upload')
const Config = require('../config')

/**
 * Returns all items 
 * @param {*} request 
 * @param {HTTPStatus} response 
 * @returns two objects, one with the details of an item and one with the details of the author
 */

const getItems = async (request, response) => {
    const authorisation = request.get('Authorization')
    let username
    if(authorisation) {
        username = await Util.getDecodedToken(Util.getToken(request)).username

    }
    let id = request.params.id;
    let user;
    let items;  
    if(id){
        items = await Items.find({
            "_id":id
        })
        console.log(items)
        user =  await User.findOne({id:items.creatorId})
        const usrObj = {
            'username':user.username,
            'id': user.id,
            'firstName':user.firstName,
            'lastName':user.lastName,
        }

        if(authorisation) {
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
/**
 * Searches through database for match to query 
 * @param {query} request 
 * @param {HTTPStatus} response 
 * @returns an array of items matching the search query passed in 
 */
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
/**
 * Adds a new item 
 * @param {Object{name,rating,price,rentPrice,location,description,categoryItem}} request 
 * @param {HTTPStatus} response 
 * @returns The JSON Object for the item that is added to the database
 */
const addItems = async(request, response) =>{
    const body = request.body 
    const username = await Util.getDecodedToken(Util.getToken(request)).username
    const userFind = await User.findOne({username:username})
    let CategoryItem = {}
    if(request.body.categoryId) {
        CategoryItem = await Categories.findOne({name:request.body.categoryId})
    }
    const item = new Items({
        name: body.name,
        rating: body.rating,
        price: body.price, 
        rentPrice: body.rentprice,
        isAvailable: true,
        creatorId: userFind,
        location: body.location, 
        AgeRating: body.ageRating, 
        description: body.description, 
        timestamp: new Date(),
        categoryId: CategoryItem.name,
        imageURL: "",
    })
    const savedItem = await item.save()

    const decodedToken = Util.getDecodedToken(Util.getToken(request));

    const userPush = await User.findByIdAndUpdate(
        decodedToken.id,
        {"$push" : {"myItems": item.id}}
    )

    response.json(savedItem)
}

/**
 * Edits the specified item
 * @param {*} request 
 * @param {HTTPStatus} response 
 * @returns The JSON Object for the item that was edited
 */
const editItems = async(request, response) =>{
    const body = request.body 
    
    const username = await Util.getDecodedToken(Util.getToken(request)).username
    const decodedToken = Util.getDecodedToken(Util.getToken(request));

    if(!request.params.itemId){
        return response.status(400).json({message:"missing itemid"}).sendStatus(400)
    }
    const item = await Items.findById(request.params.itemId)
    if(decodedToken.id !== item.creatorId.toString()) {
        return response.status(403).json({status:"not allowed"})
    }
    let CategoryItem = {}
    if(request.body.categoryId) {
        CategoryItem = await Categories.findOne({name:request.body.categoryId})
    }

    const itemNew = {
        "name": body.name ? body.name : item.name,
        "price": body.price ? body.price : item.price, 
        "rentPrice": body.rentprice ? body.rentprice : item.rentprice,
        "location": body.location ? body.location : item.location, 
        "description" :body.description ? body.description : item.description, 
        "categoryId": body.categoryId ? body.categoryId : item.categoryId, 
    }
    const it = await Items.findByIdAndUpdate(item.id, itemNew)
    console.log(it)
    response.json(itemNew)
}

const deleteItems = async(request,response) => {
    const username = await Util.getDecodedToken(Util.getToken(request)).username
    const decodedToken = Util.getDecodedToken(Util.getToken(request));
    const item = await Items.findById(request.params.itemId)

    if(decodedToken.id !== item.creatorId.toString()) {
        return response.status(403).json({status:"not allowed"})
    }
    if(!request.params.itemId){
        return response.status(400).json({message:"missing itemid"}).sendStatus(400)
    }
    const it = await Items.deleteOne({_id: request.params.itemId})
    if (it.acknowledged) {
        response.status(200).json({status: 'success'})
      } else {
        response.status(400).json({ status: "unable to delete item" })
      }
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
    // console.log(Config.downloadURL)
    return response.json(await item.save())
}
module.exports = {
    getItems, 
    addItems,
    searchItems,
    addPhotoToItem,
    editItems,
    deleteItems
}