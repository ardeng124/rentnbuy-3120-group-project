const Items = require('../models/item')
const User = require('../models/user')
const Auth = require('./auth')

const getItems = async (request, response) => {
    let id = request.params.id;

    let items;
    if(id){
        items = await Items.find({
            "_id":id
        })
    } else {
        items = await Items.find({})
    }
    response.json({items})
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
    const user = await User.findById(body.creatorId)
    const item = new Items({
        name: body.name,
        rating: body.rating,
        price: body.price, 
        isAvailable: true,
        creatorId: body.creatorId,
        location: body.location, 
        AgeRating: body.ageRating, 
        description: body.description, 
        timestamp: new Date(),
    })
    const savedItem = await item.save()
    user.items = user.items.concat(savedItem.id)
    response.json(savedItem)
}

module.exports = {
    getItems, 
    addItems,
    searchItems
}