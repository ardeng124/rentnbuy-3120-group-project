const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    username: String, 
    firstName: String, 
    lastName: String, 
    image: String, //TO DO GridFS, 
    age: Number, 
    isAdmin: Boolean, 
    phoneNumber: String, 
    emailAddress: String, 
    favourites:  { type : Array , "default" : [] },
    location: String
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

profileSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Profile", profileSchema);