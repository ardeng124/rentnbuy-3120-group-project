const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    token: {type: String, unique: false}
})
sessionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.token = document._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})
module.exports = mongoose.model('Session', sessionSchema)
