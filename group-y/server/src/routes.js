const express = require('express')
const auth = require('./controllers/auth')
const conv = require('./controllers/conversations')
const messages = require('./controllers/comments')
const items = require('./controllers/items')
const reviews = require('./controllers/reviews')
const router = express.Router()
 
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

router.post('/auth/register', auth.createUser)

router.get('/auth/', auth.getUser)

//Login functionality - Extended Functionality
router.post('/auth/login', auth.existingUser)

/* GET conversations returns a list of all current conservations */
router.get('/api/conversations', conv.getConversations)

/* POST to conversations creates a new conversation */
router.post('/api/conversations', conv.createConversation)

/* GET a conversation returns the list of the last N conversations */
router.get('/api/conversations/:id', messages.getMessages)

/* POST to a conversation to create a new message */
router.post('/api/conversations/:id', messages.createMessage)

/* GET a message URL to get details of a message */
router.get('/api/conversations/:id/:msgid', messages.getMessage)

/* DELETE to message URL to delete the message */
router.delete('/api/conversations/:id/:msgid', messages.deleteMessage)

/* GET a list of all items */
router.get('/api/items', items.getItems)
/* POST an item */
router.post('/api/items', items.addItems)
/* GET all reviews */
router.get('/api/reviews', reviews.getReviews)
/* POST a review */
router.post('/api/reviews', reviews.addReview)
module.exports = router 