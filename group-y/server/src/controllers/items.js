const Items = require('../models/item')
const User = require('../models/user')
const Auth = require('./auth')
const Util = require('./util')

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
    const user = await User.findOne({username:username})
    console.log(user)
    const item = new Items({
        name: body.name,
        rating: body.rating,
        price: body.price, 
        isAvailable: true,
        creatorId: user,
        location: body.location, 
        AgeRating: body.ageRating, 
        description: body.description, 
        timestamp: new Date(),
    })
    const savedItem = await item.save()
    user.myItems = user.myItems.concat(savedItem.id)
    response.json(savedItem)
}

module.exports = {
    getItems, 
    addItems,
    searchItems
}