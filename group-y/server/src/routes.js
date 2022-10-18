const express = require('express')
const auth = require('./controllers/auth')
const items = require('./controllers/items')
const reviews = require('./controllers/reviews')
const rent = require('./controllers/rent')
const buy = require('./controllers/buy')
const offer = require('./controllers/offers')
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

//
router.get('/auth/getUserDetails', auth.getUserDetails)

// /* GET conversations returns a list of all current conservations */
// router.get('/api/conversations', conv.getConversations)

// /* POST to conversations creates a new conversation */
// router.post('/api/conversations', conv.createConversation)

// /* GET a conversation returns the list of the last N conversations */
// router.get('/api/conversations/:id', messages.getMessages)

// /* POST to a conversation to create a new message */
// router.post('/api/conversations/:id', messages.createMessage)

// /* GET a message URL to get details of a message */
// router.get('/api/conversations/:id/:msgid', messages.getMessage)

// /* DELETE to message URL to delete the message */
// router.delete('/api/conversations/:id/:msgid', messages.deleteMessage)

/* GET a list of all items */
router.get('/api/items/:id?', items.getItems)
router.post('/api/search', items.searchItems)

/* GET a list of N items */
// router.get("/api/items/count", items.getXItems)

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

module.exports = router 