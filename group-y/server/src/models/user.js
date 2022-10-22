const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, unique: false},
    firstName: String,
    lastName: String, 
    passwordHash: String, 
    image: String, //TO DO GridFS, 
    age: Number, 
    birthday: String,
    gender: String,
    isAdmin: Boolean, 
    phoneNumber: String, 
    emailAddress: String, 
    favourites: [
      {
        type: Object,
        ref: 'User'
      }],
    location: String,
    profilePhotoLocation: String, 
    reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review'
        }
    ],
    myItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      }
    ],
    boughtItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      }
    ],
    rentedItems: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        }
    ],
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("User", userSchema);