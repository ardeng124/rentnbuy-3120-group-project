const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
        name: String,
        rating: Number,
        price: Number, 
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reviews: {type: mongoose.Types.ObjectId, ref: 'Reviews'},
        categoryId: {type: mongoose.Types.ObjectId, ref: 'Category'},
        location: String, 
        ageRating: Number, 
        description: String, 
        timestamp: {type: Date, default: Date.now},
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