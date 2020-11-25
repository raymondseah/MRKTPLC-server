const jwt = require('jsonwebtoken')
const SHA256 = require("crypto-js/sha256")
const uuid = require('uuid')
const UserModel = require('../models/userModel')

const userControllers = {
    register: (req, res) => {
        // try the library at https://ajv.js.org/ to validate user's input

        UserModel.findOne({
            email: req.body.email
        })
            .then(result => {
                // if found in DB, means email has already been taken, redirect to registration page
                if (result) {
                    res.statusCode = 400
                    res.json({
                        "success": false,
                        "message": "Email has already been taken"
                    })
                    return
                }

                // no document found in DB, can proceed with registration

                // generate uuid as salt
                const salt = uuid.v4()

                // hash combination using bcrypt
                const combination = salt + req.body.password

                // hash the combination using SHA256
                const hash = SHA256(combination).toString()

                // create user in DB
                UserModel.create({
                    username: req.body.username,
                    email: req.body.email,
                    location: req.body.location,
                    pwsalt: salt,
                    hash: hash
                })
                    .then(createResult => {
                        if (createResult) {
                            res.statusCode = 201
                            res.json({
                                "success": true,
                                "message": "User created"
                            })
                            return
                        }
                    })
                    .catch(err => {
                        res.statusCode = 400
                        res.json({
                            "success": false,
                            "message": "Unable to create user"
                        })
                    })
            })
            .catch(err => {
                res.statusCode = 400
                res.json({
                    "success": false,
                    "message": "Unable to create user"
                })
            })
    },

    login: (req, res) => {
        // validate input here on your own
        console.log(req.body)

        // gets user with the given email
        UserModel.findOne({
            email: req.body.email
        })
            .then(result => {
                // check if result is empty, if it is, no user, so login fail, return err as json response
                if (!result) {
                    res.statusCode = 401
                    res.json({
                        "success": false,
                        "message": "Either username or password is wrong"
                    })
                    return
                }

                // combine DB user salt with given password, and apply hash algo
                const hash = SHA256(result.pwsalt + req.body.password).toString()

                // check if password is correct by comparing hashes
                if (hash !== result.hash) {
                    res.statusCode = 401
                    res.json({
                        "success": false,
                        "message": "Either username or password is wrong"
                    })
                    return
                }

                // login successful, generate JWT
                const token = jwt.sign({
                    username: result.username,
                    email: result.email,
                }, process.env.JWT_SECRET, {
                    algorithm: "HS384",
                    expiresIn: "1h"
                })

                // decode JWT to get raw values
                const rawJWT = jwt.decode(token)

                // return token as json response
                res.json({
                    success: true,
                    token: token,
                    expiresAt: rawJWT.exp
                })
            })
            .catch(err => {
                res.statusCode = 500
                res.json({
                    success: false,
                    message: "unable to login due to unexpected error"
                })
            })
    },

    getUserProfile: (req, res) => {
        res.json({
            username: req.body.username,
            email: req.body.email,
            location: req.body.location
        })
    }

}

module.exports = userControllers
