const Review = require('../models/review')
const User = require('../models/user')

const getReviews = async (request, response) => {
    const reviews = await Review.find({})
    response.json({reviews})
}

const addReview = async(request, response) =>{
    const body = request.body 
    const user = await User.findById(body.creatorId)
    const review = new Review({
        creatorId: body.userId,
        text: body.text, 
        timestamp: Date.now()
    })
    const savedReview = await review.save()
    user.reviews = user.reviews.concat(savedReview.id)
    response.json(savedReview)
}

module.exports = {
    getReviews, 
    addReview
}