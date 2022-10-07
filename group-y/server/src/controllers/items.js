const Items = require('../models/item')


const getItems = async (request, response) => {
    const items = await Items.find({})
    response.json({items})
}

module.exports = {
    getItems
}