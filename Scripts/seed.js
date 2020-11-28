require('dotenv').config()
const mongoose = require('mongoose')
const mockListings = require('../Models/mockListings')
const listingModel = require('../Models/ListingModel') //link to schema
// after creating cluster using Atlas Mongo copy the URL Paste here, replace password & test with DB name
//no ideal to show PW. can hide pw via environment variable
// const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
// const mongoURI = `mongodb+srv://project2-admin:project2-admin@cluster0.tnct0.mongodb.net/Cluster0`
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('MongoDB connection successful')
    })
    .then(response => {
        listingModel.insertMany(mockLeeeistings)
            .then(insertResponse => {
                console.log('Data seeding successful')
            })
            .catch(insertErr => {
                console.log(insertErr)
            })
            .finally(() => {
                mongoose.disconnect()
            })
    })
    .catch(err => {
        console.log(err)
    })






