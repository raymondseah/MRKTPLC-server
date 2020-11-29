'use strict'
const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
        max: 100
    },
    username: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: String,
    listing_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    expiry_date: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const ListingModel = mongoose.model('Listings', listingSchema)

module.exports = ListingModel