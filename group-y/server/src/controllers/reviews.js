const Review = require('../models/review')
const User = require('../models/user')
const Util = require('./util')
const Item = require('../models/item')


const getReviews = async (request, response) => {
    const body = request.body 
    const id = body.id
    const reviews = await Review.find({})
    response.json({reviews})
}


/**
 * Adds new review to both user reviews array and item reviews array
 * @param {*} request 
 * @param {*} response 
 */
const addReview = async(request, response) =>{
    
    const decodedToken = Util.getDecodedToken(Util.getToken(request));

    const body = request.body

    const inUser = await User.findById(decodedToken.id)
    
    const review = new Review({
        creator: inUser.username,
        text: body.text, 
        timestamp: Date.now(),
        stars: body.stars ? body.stars : null
    })
    const savedReview = await review.save()
    
    const userPush = await User.findByIdAndUpdate(
        decodedToken.id,
        {"$push" : {"reviews": review.id}}
    )

    //pushes entire item as object to reviews array
    const item = await Item.findByIdAndUpdate(
        request.body.itemId,
        {"$push" : {"reviews": review}}
    )
    console.log(item)

    response.json(savedReview)
}

module.exports = {
    getReviews, 
    addReview
}