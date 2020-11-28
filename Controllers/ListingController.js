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
    },
    createListing: (req, res) => {
        console.log(req.body)
        ListingModel.create({
            description: req.body.description,
            img: req.body.img,
            listing_name: req.body.listing_name,
            category: req.body.category,
            location: req.body.location,
            expiry_date: req.body.expiry_date,
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    }
}

module.exports = controllers