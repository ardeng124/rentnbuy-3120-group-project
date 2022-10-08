const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    image: String, 
    name: String, 
    creator: {type: mongoose.Types.ObjectId, ref: 'User'},
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Category", categorySchema);