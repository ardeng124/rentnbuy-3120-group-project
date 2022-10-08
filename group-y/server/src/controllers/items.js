const Items = require('../models/item')
const User = require('../models/user')

const getItems = async (request, response) => {
    const items = await Items.find({})
    response.json({items})
}

const addItems = async(request, response) =>{
    const body = request.body 
    const user = await User.findById(body.creatorId)
    const item = new Items({
        rating: body.rating,
        price: body.price, 
        creatorId: user.id,
        location: body.location, 
        AgeRating: body.ageRating, 
        timestamp: new Date(),
    })
    const savedItem = await item.save()
    user.items = user.items.concat(savedItem.id)
    response.json(savedItem)
}

module.exports = {
    getItems, 
    addItems
}