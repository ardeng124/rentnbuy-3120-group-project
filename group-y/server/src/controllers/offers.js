const Offers = require('../models/offer')

const User = require('../models/user')
const Item = require('../models/item')
const Util = require('./util')

const getOffersByMe = async (request, response) => {
    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    const allOffers = await Offers.find(
        {
            offerMadeBy:decodedToken.id,
        }
    ).populate("offerMadeTo")
        .populate("item")
    response.json(allOffers)
}

const getOffersToMe = async (request, response) => {
    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    const allOffers = await Offers.find(
        {
            offerMadeTo:decodedToken.id,
        }
    ).populate("offerMadeBy")
        .populate("item")
    response.json(allOffers)
}

const makeOffer = async(request, response) =>{
    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    const user = await User.findOne({username:decodedToken.username})
    console.log(request.body)
    if(request.body.startDate == "" || request.body.endDate == ""){
        return response.status(304).json(({"status":"Please enter both start and end date"}))
    }
    console.log(user)
    const item = await Item.findById(request.body.itemId)
    console.log(item)
    const offer = new Offers ({
        offerMadeBy: user.id ,
        offerMadeTo: item.creatorId, 
        item: item.id,
        startDate: request.body.startDate,
        endDate: request.body.endDate,
        offerPrice: item.rentPrice,
    })
    const savedOffer = await offer.save();
    return response.status(201).json((savedOffer))
}

module.exports = {
    getOffersToMe, 
    getOffersByMe,
    makeOffer
}