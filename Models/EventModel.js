'use strict'
const mongoose = require('mongoose')

const EventsSchema = new mongoose.Schema({
    hosted_by: {
        type: String,
        required: true,
    },
    hosted_date: {
        type: Date,
        default: Date.now,
    },
    hosted_time: {
        type: String
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    listed_product: {
        type: String
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
    },
    people_joining: {
        type: [],
    }
})

const EventsModel = mongoose.model('Events', EventsSchema)

module.exports = EventsModel