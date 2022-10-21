const mongoose = require('mongoose')
const config = require('../config')
const User = require('./user')
const Item = require('./item')
const Category = require('./category')
const Review = require('./review')
const Session = require('./session')


const initDB = async () => {
    await mongoose
        .connect(config.mongoDBUrl)
        .catch((error) => {    
            console.log('error connecting to MongoDB:', error.message)  
        })
    }

module.exports = { 
  Session, 
  initDB, 
  User, 
  Item,
  Category,
  Review
}
