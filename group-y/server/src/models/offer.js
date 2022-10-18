const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({ 
        offerMadeBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        offerMadeTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        startDate: {
            type:Date
        },
        endDate: {
            type: Date
        },
        offerPrice: Number,
        timestamp: {type: Date, default: Date.now},
        
    },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

offerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Offer", offerSchema);