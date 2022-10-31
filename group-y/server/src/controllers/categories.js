const Util = require('./util')
const User = require('../models/user')
const Item = require('../models/item')
const category = require('../models/category')

/**
 * Adds a new category (only if user is an admin)
 * @param {*} request 
 * @param {*} response 
 * @returns either the new category or status text saying unauthorised
 */
const addCategory = async (request, response) => {
    const body = request.body 
    if(!body.name) {
        response.status(400).json({"status":"invalid request format"})
    }
    const username = await Util.getDecodedToken(Util.getToken(request)).username
    const userFind = await User.findOne({username:username})
    if(userFind.isAdmin) {
        const categorytoAdd = new category({
            name: body.name,
            creator:userFind.id
        })
        const savedCat = await categorytoAdd.save()
        response.status(200).json({savedCat})

    } else {
        response.status(403).json({"status":"unauthorised"})
    }

}

const getCategories = async (request, response) => {
    retcat = await category.find({})
    response.json(retcat)

}

module.exports = {
    addCategory,
    getCategories
}