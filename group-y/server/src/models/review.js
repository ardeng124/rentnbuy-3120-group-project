const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'Profile'},
    text: String, 
    timestamp: {type: Date, default: Date.now}, 
    usersWhoHaveVoted: { type : Array , "default" : [] },
    stars: Number, 
    comments: { type : Array , "default" : [] }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Review", reviewSchema);