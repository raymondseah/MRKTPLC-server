'use strict'

const mongoose = require('mongoose')
const moment = require('moment')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max:100
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max:20
    },
    location: {
        type: String,
        required: true
    },
    pwsalt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel