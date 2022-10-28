const Util = require('./util')
const User = require('../models/user')
const Item = require('../models/item')

const getRentedItemsForAUser = async (request, response) => {
    const decodedToken = Util.getDecodedToken(Util.getToken(request));
    if(!decodedToken){
       return response.status(401).json({status:"Unauthorised"})
    }
    const user = await User.findOne({"username":decodedToken.username}).populate('rentedItems')
    if(!user){
        return response.status(400).json({status:"Something went wrong"})
    }
    if(user.rentedItems){
        return response.json(user.rentedItems)
    }else{
        return response.json([])
    }
}


const rentAnItem = async (request, response) => {
    const decodedToken = Util.getDecodedToken(Util.getToken(request));
    const itemId = request.params.itemId;
    if(!decodedToken){
        return response.status(401).json({status:"Unauthorised"})
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
        {"$push" : {"rentedItems": item.id}}
    )
    if(!item){
        return response.status(400).json({status:"Something went wrong"})
    }
    return response.json(updatedItem)
   
}


module.exports = {
    getRentedItemsForAUser,
    rentAnItem
}