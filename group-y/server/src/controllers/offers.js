const Offers = require('../models/offer')

const User = require('../models/user')
const Item = require('../models/item')
const Util = require('./util')
const offer = require('../models/offer')

/**
 * Gets offers made by current user
 * @param {*} request 
 * @param {*} response 
 * @returns A json object containing the array of all offers made by the user
 */
const getOffersByMe = async (request, response) => {

    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    if (!decodedToken) {
        return response.status(401).json({})
    }
    const allOffers = await Offers.find(
        {
            offerMadeBy:decodedToken.id,
        }
    ).populate("offerMadeTo")
        .populate("item")
    response.json(allOffers)
}

/**
 * Gets offers made TO the user
 * @param {*} request 
 * @param {*} response 
 * @returns a json object with an array of all offers made to items the user owns
 */
const getOffersToMe = async (request, response) => {

    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    if (!decodedToken) {
        return response.status(401).json({})
    }
    const allOffers = await Offers.find(
        {
            offerMadeTo:decodedToken.id,
        }
    ).populate("offerMadeBy")
        .populate("item")
    response.json(allOffers)
}
/**
 * Creates a rent offer with start and end dates on an item
 * @param {*} request 
 * @param {*} response 
 * @returns A JSON object containing the new offer
 */
const makeOffer = async(request, response) =>{
    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    const user = await User.findOne({username:decodedToken.username})
    if(request.body.startDate == "" || request.body.endDate == ""){
        return response.status(304).json(({"status":"Please enter both start and end date"}))
    }
    
    const item = await Item.findById(request.body.itemId)
    const reciever = await User.findById(item.creatorId)

    const offer = new Offers ({
        offerMadeBy: user,
        offerMadeTo: reciever, 
        item: item.id,
        startDate: request.body.startDate,
        endDate: request.body.endDate,
        offerPrice: item.rentPrice,
        status: "Pending"
    })
    const savedOffer = await offer.save();
    return response.status(201).json((savedOffer))
}

/**
 * Changes the offer status to either Approved or Denied
 * @param {*} request 
 * @param {*} response 
 * @returns JSON object with status text
 */
const offerStatus = async(request, response) => {
    //TODO
    //offer status is set to approved
    //item is set to unavailable
    //offer is deleted / somehow removed from owner end or changed in a way to separate it from the others
    const offerId = request.params.id;

    const decodedToken = Util.getDecodedToken(Util.getToken(request))
    const offerItem = await offer.findById(offerId)
    if (decodedToken.id != offerItem.offerMadeTo){
        return response.status(403).json(({"status":"Unauthorized"}))
    }
    offer.findByIdAndUpdate(offerId, {
        status:request.body.status
    },
    function (err, res) {
        if (err){
        console.log(err)
        response.status(400).json(err)
        }
        else{
        console.log(res);
        }
    })

    if(request.body.status == "Approved") {
        Item.findByIdAndUpdate(offerItem.item._id, {
            isAvailable: false
        },  function (err, res) {
            if (err){
            console.log(err)
            response.status(400).json(err)
            }
            else{
            console.log(res);
            }
        }
        )
        //todo: Update user rentedItems array with this new item once approved
    }
    return response.status(201).json("Success")
}

module.exports = {
    getOffersToMe, 
    getOffersByMe,
    makeOffer,
    offerStatus
}