require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express();
const port = process.env.PORT;


const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin: '*'
}))

app.options('*', cors())

/**
 * USER ON-BOARDING ROUTES
 */

app.get('/api/v1', (req, res) => {
    res.json({
        message: "Welcome to FOOD-MRKTPLC app"
    })
})

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