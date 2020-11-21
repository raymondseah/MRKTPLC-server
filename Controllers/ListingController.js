'use strict'
const ListingModel = require('../Models/ListingModel')

const controllers = {
    showAllListings: (req, res) => {
        ListingModel.find()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    }
}

module.exports = controllers