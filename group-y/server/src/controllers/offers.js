const Offers = require('../models/offer')

const User = require('../models/user')
const Item = require('../models/item')
const Util = require('./util')
const offer = require('../models/offer')

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
    console.log(item.creatorId)
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
    }
    return response.status(201).json("Success")
}

module.exports = {
    getOffersToMe, 
    getOffersByMe,
    makeOffer,
    offerStatus
}