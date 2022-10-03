const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    rating: Number,
    price: Number, 
    reviews: {type: mongoose.Types.ObjectId, ref: 'Reviews'},
    categoryId: {type: mongoose.Types.ObjectId, ref: 'Category'},
    location: String, 
    AgeRating: Number, 
    timestamp: {type: Date, default: Date.now},
    userId: {type: mongoose.Types.ObjectId, ref: 'Session'}
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Item", itemSchema);