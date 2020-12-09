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
            hosted_time: req.body.hosted_time,
            location: req.body.location,
            description: req.body.description,
            contact_number: req.body.contact_number,

        })
            .then(result => {
                if (result) {
                    res.statusCode = 200
                    res.json(result)
                    console.log('yesssss')
                    return

                }
                console.log('no')

            })
            .catch(err => {
                res.statusCode = 500
                res.json(err)
                console.log(err)
            })
    },
    getEventById: (req, res) => {


        let id = req.params.id

        eventModel.findOne({
            _id: id
        })
            .then(result => {
                if (!result) {
                    res.statusCode = 404
                    res.json()
                    return
                }

                res.json(result)
            })
            .catch(err => {
                res.statusCode = 500
                res.json(err)
            })

    },
    deleteEventsById: (req, res) => {

        eventModel.findOne(
            {
                _id: req.params.id
            }
        )
            .then(result => {


                eventModel.deleteOne({
                    _id: req.params.id
                })
                    .then(deleteResult => {
                        res.json(deleteResult)
                    })
                    .catch(err => {
                        res.statusCode = 500
                        res.json(err)
                    })
            })
            .catch(err => {
                res.statusCode = 500
                res.json(err)
            })

    },
    getEventByUsers: (req, res) => {
        console.log(res.locals.jwtData.username)

        eventModel.find({
            hosted_by: res.locals.jwtData.username
        })
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
    addPeopleToEvent: (req, res) => {
        console.log(req.body)
        let updateObject = req.body
        eventModel.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
            $push: { people_joining: updateObject.people_joining },
        }
        )
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    },
    removeUserFromEvent : (req,res) =>{
        console.log(req.body)
        let updateObject = req.body
        eventModel.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
            $pull: { people_joining: updateObject.people_joining },
        }
        )
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    },
    
}

module.exports = controllers