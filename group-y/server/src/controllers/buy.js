const Util = require('./util')
const User = require('../models/user')
const Item = require('../models/item')

const getBoughtItems = async (request, response) => {
    const decodedToken = Util.getDecodedToken(Util.getToken(request));
    if(!decodedToken){
       return response.status(401).json({status:"Unauthroised"})
    }
    const user = await User.findOne({"username":decodedToken.username}).populate('boughtItems')
    if(!user){
        return response.status(400).json({status:"Something went wrong"})
    }
    if(user.boughtItems){
        return response.json(user.rentedItems)
    }else{
        return response.json([])
    }
}

const buyAnItem = async (request, response) => {
    const decodedToken = Util.getDecodedToken(Util.getToken(request));
    const itemId = request.params.itemId;
    if(!decodedToken){
        return response.status(401).json({status:"Unauthroised"})
    }
    const filter = {"_id": itemId}
    const update = {"isAvailable": false}
    const item = await Item.findById(itemId)
    if(!item.isAvailable){
        return response.status(400).json({status: "Item is not available!"})
    }
    const updatedItem = await Item.findOneAndUpdate(filter, update, {new: true})
    const user = await User.findByIdAndUpdate(
        decodedToken.id,
        {"$push" : {"boughtItems": item.id}}
    )
    if(!item){
        return response.status(400).json({status:"Something went wrong"})
    }
    return response.json(updatedItem)
    
}

module.exports = {
    getBoughtItemsForAUser,
    buyAnItem
}