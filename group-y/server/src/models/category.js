const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    Image: String, 
    Name: String, 
    Creator: {type: mongoose.Types.ObjectId, ref: 'Session'},
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