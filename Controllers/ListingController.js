'use strict'
const _ = require('lodash')
const { nanoid } = require('nanoid')
const ListingModel = require('../Models/ListingModel')

const controllers = {
    getAllListings: (req, res) => {
        ListingModel.find()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    },
    createListing: (req, res) => {
        console.log(res.locals.jwtData)
        let slug = _.kebabCase(req.body.listing_name)
        ListingModel.find({
            slug: slug
        })
            .then(slugCheckResult => {
                console.log(slugCheckResult)
                if (slugCheckResult) {
                    const id = nanoid()
                    slug = slug + "-" + id
                    // console.log(slug)
                    ListingModel.create({
                        description: req.body.description,
                        img: req.body.img,
                        listing_name: req.body.listing_name,
                        category: req.body.category,
                        location: req.body.location,
                        expiry_date: req.body.expiry_date,
                        email: res.locals.jwtData.email,
                        username: res.locals.jwtData.username,
                        slug: slug
                    })
                        .then(createResult => {
                            res.json(createResult)
                        })
                        .catch(err => {
                            res.json(err)
                        })
                }
            })

    },
    getUserListings: (req, res) => {
        console.log(res.locals.jwtData)
        ListingModel.find({
            username: res.locals.jwtData.username
        })
            .then(listingResults => {
                res.json(listingResults)
            })
            .catch(err => {
                res.json(err)
            })
    },
    getListing: (req, res) => {
        let slug = req.params.slug

        ListingModel.findOne({
            slug: slug,
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    },
    editListing: (req, res) => {
        let oldSlug = req.params.slug
        let newListingName = _.kebabCase(req.body.listing_name)
        console.log("req" + req.body)
        console.log(newListingName)
        const id = nanoid()
        console.log(id)
        let newSlug = newListingName + "-" + id
        let updateObject = req.body
        if (oldSlug !== newSlug) {
            ListingModel.findOneAndUpdate({
                slug: oldSlug,
            }, {
                $set: updateObject,
                slug: newSlug
            }
            )
                .then(result => {
                    res.json(result)
                    console.log('newslug')
                })
                .catch(err => {
                    res.json(err)
                })
        }
        else {
            ListingModel.findOneAndUpdate({
                slug: oldSlug,
            }, {
                $set: updateObject,
            }
            )
                .then(result => {
                    res.json(result)
                    console.log('oldslug')
                })
                .catch(err => {
                    res.json(err)
                })
        }
    },
    deleteListing: (req, res) => {
        let slug = req.params.slug
        console.log(slug)
        ListingModel.findOne({
            slug: slug
        })
            .then(result => {
                ListingModel.deleteOne({
                    slug: result.slug
                })
                    .then(deleteResult => {
                        res.json(deleteResult)
                    })
                    .catch(err => {
                        res.json(err)
                    })
            })
            .catch(err => {
                res.json(err)
            })
    }
}

module.exports = controllers