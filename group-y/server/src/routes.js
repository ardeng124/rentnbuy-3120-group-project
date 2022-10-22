const express = require('express')
const auth = require('./controllers/auth')
const items = require('./controllers/items')
const reviews = require('./controllers/reviews')
const rent = require('./controllers/rent')
const buy = require('./controllers/buy')
const offer = require('./controllers/offers')
const categories = require('./controllers/categories')
const router = express.Router()
 
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

router.post('/auth/register', auth.createUser)

router.get('/auth/', auth.validUser)

//Login functionality - Extended Functionality
router.post('/auth/login', auth.loginUser)

//Change User Password
router.put('/auth/password', auth.changeUserPassword)

//Edit Account Details
router.put('/auth/edit', auth.editAccountDetails)

router.get('/auth/getUserDetails', auth.getUserDetails)

router.get('/api/items/:id?', items.getItems)
router.post('/api/search', items.searchItems)

/* POST an item */
router.post('/api/items', items.addItems)
/* GET all reviews */
router.get('/api/reviews', reviews.getReviews)
/* POST a review */
router.post('/api/reviews', reviews.addReview)

router.get('/api/getRentedItems', rent.getRentedItemsForAUser)
router.post('/api/rent/:itemId', rent.rentAnItem)

router.post('/api/buy/:itemId', buy.buyAnItem)
router.get('/api/getBoughtItems', buy.getBoughtItems)

router.post('/api/makeOffer', offer.makeOffer)
router.get('/api/getOffersToMe', offer.getOffersToMe)
router.get('/api/getOffersByMe', offer.getOffersByMe)
router.put('/api/approveOffer/:id', offer.offerStatus)
router.put('/api/user/favourites', auth.modifyFavourite)

router.post('/api/category/add', categories.addCategory)
router.get('/api/category/', categories.getCategories)

module.exports = router 