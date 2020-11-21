const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 100
    },
    listing: {

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

const ListingModel = mongoose.model('User', listingSchema)

module.exports = ListingModel