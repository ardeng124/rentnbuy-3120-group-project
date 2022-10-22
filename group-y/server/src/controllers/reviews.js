const Review = require('../models/review')
const User = require('../models/user')
const Util = require('./util')
const Item = require('../models/item')


const getReviews = async (request, response) => {
    const reviews = await Review.find({})
    response.json({reviews})
}

const addReview = async(request, response) =>{
    
    const decodedToken = Util.getDecodedToken(Util.getToken(request));

    const body = request.body

    console.log("id", request.body)
    console.log("huh?", decodedToken)

    const inUser = await User.findById(decodedToken.id)

    console.log(inUser)

    const review = new Review({
        creator: inUser.username,
        text: body.text, 
        timestamp: Date.now()
    })
    const savedReview = await review.save()
    
    const userPush = await User.findByIdAndUpdate(
        decodedToken.id,
        {"$push" : {"reviews": review.id}}
    )

    const item = await Item.findByIdAndUpdate(
        request.body.itemId,
        {"$push" : {"reviews": review.id}}
    )

    response.json(savedReview)
}

module.exports = {
    getReviews, 
    addReview
}