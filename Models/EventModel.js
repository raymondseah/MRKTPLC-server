'use strict'


const mongoose = require('mongoose')

const EventsSchema = new mongoose.Schema({
    location: {
        type: String,
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

const EventsModel = mongoose.model('Events', EventsSchema)

module.exports = EventsModel