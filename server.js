require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const methodOverride = require('method-override')

// controllers
const usersController = require('./Controllers/UserController')
const listingControllers = require('./Controllers/ListingController')
const eventControllers = require('./Controllers/EventController')
const messageControllers = require('./Controllers/MessageController')
const app = express();
const port = process.env.PORT;


const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

// =======================================
//           METHOD-OVERRIDE
// =======================================
// tells Express app to make use of the imported method-override library
app.use(methodOverride('_method'))

app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin: '*'
}))

app.options('*', cors())

/**
 * USER ON-BOARDING ROUTES
 **/

app.get('/api/v1', (req, res) => {
    res.json({
        message: "Welcome to FOOD-MRKTPLC app"
    })
})


// create listing
app.post('/api/v1/users/listing/new', verifyJWT, listingControllers.createListing)
// get user listings
app.get('/api/v1/users/listings', verifyJWT, listingControllers.getUserListings)
// get all listings
app.get('/api/v1/listings/all', listingControllers.getAllListings)
// get single listing
app.get('/api/v1/listings/:slug', listingControllers.getListing)
// update listing
app.patch('/api/v1/listings/:slug', verifyJWT, listingControllers.editListing)
// delete listing
app.delete('/api/v1/listings/:slug', verifyJWT, listingControllers.deleteListing)

// user registration
app.post('/api/v1/users/register', usersController.register)
// user login route
app.post('/api/v1/users/login', usersController.login)
// user profile route
app.get('/api/v1/users/profile', verifyJWT, usersController.getUserProfile)
app.patch('/api/v1/users/profile', verifyJWT, usersController.editUserProfile)

/*========================= */
/*======Events Routes====== */
/*========================= */
app.post('/api/v1/events/new', verifyJWT, eventControllers.createEvent)
app.get('/api/v1/events/:id', eventControllers.getEventById)
app.get('/api/v1/events', eventControllers.showAllEvents)
app.delete('/api/v1/events/:id', eventControllers.deleteEventsById)
app.get('/api/v1/users/events', verifyJWT, eventControllers.getEventByUsers)
app.patch('/api/v1/events/:id', verifyJWT, eventControllers.addPeopleToEvent)




/*========================= */
/*=====Message Routes====== */
/*========================= */

app.post('/api/v1/send-message', messageControllers.sendMessage)

/*========================= */
/*===Listeners Routes====== */
/*========================= */


// connect to DB, then inititate Express app
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        // DB connected successfully
        console.log('DB connection successful')

        app.listen(process.env.PORT || port, () => {
            console.log(`FOOD-MRKTPLC app listening on port: ${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })


function verifyJWT(req, res, next) {
    // get the jwt token from the request header
    const authToken = req.headers.auth_token
    console.log(authToken)
    // check if authToken header value is empty, return err if empty
    if (!authToken) {
        res.json({
            success: false,
            message: "Auth header value is missing"
        })
        return
    }

    // verify that JWT is valid and not expired
    try {
        // if verify success, proceed
        const userData = jwt.verify(authToken, process.env.JWT_SECRET, {
            algorithms: ['HS384']
        })
        // store jwt token into res.locals.jwtData
        res.locals.jwtData = userData;
        next()
    } catch (err) {
        // if fail, return error msg

        res.json({
            success: false,
            message: "Auth token is invalid"
        })
        return
    }
}