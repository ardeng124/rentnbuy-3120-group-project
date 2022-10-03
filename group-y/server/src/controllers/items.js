const Items = require('../models/Item')


const getItems = async (request, response) => {
    const items = await Items.find({})
    response.json({items})
}

module.exports = {
    getItems
}