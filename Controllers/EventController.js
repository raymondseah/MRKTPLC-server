'use strict'
const eventModel = require('../Models/EventModel')

const controllers = {
    showAllEvents: (req, res) => {
        eventModel.find()
            .then(results => {
                console.log('Works')
                res.json(results)
            })
            .catch(err => {
                console.log('Does not work')
                res.statusCode = 500
                res.json(err)
            })
    },
    createEvent: (req, res) => {

        console.log(res.locals.jwtData.username)

        eventModel.create({
            hosted_by: res.locals.jwtData.username,
            hosted_date: req.body.hosted_date,
            location: req.body.location,
            description: req.body.description,
            listed_product: req.body.listed_product,

        })
            .then(result => {
                if(result) {
                    res.statusCode=200
                    res.json(result)
                    console.log('yesssss')
                    return

                }
                console.log('no')

            })
            .catch(err => {
                res.statusCode = 500
                res.json(err)
                console.log('error')
            })
    }
}

module.exports = controllers