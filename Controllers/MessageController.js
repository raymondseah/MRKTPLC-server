const axios = require('axios')
const qs = require('qs')


const messageControllers = {
    sendMessage: (req,res) => {
        const retrievedForm = req.body
        console.log (retrievedForm)
        
        axios.post(
            'https://api.mailgun.net/v3/sandboxbb7f466af4b74f129ba68b3199b1563f.mailgun.org/messages',
            qs.stringify({
                from: `${retrievedForm.name} <${retrievedForm.email}>`,
                to: `seah_raymond@hotmail.com`,
                subject: 'New Contact Form Submission from ' + retrievedForm.name,
                text: retrievedForm.message
            }),
            {
                auth: {
                    username: process.env.MAILGUN_USERNAME,
                    password: process.env.MAILGUN_PASSWORD
                },
            }
        )
            .then(response => {
                res.json({
                    success: true,
                    message: "successfully sent"
                })
            })
            .catch(err => {
                console.log(err)
                res.statusCode = 500
                res.json({
                    "success": false,
                    "message": "sending failed"
                })
            })
    }
}

module.exports = messageControllers