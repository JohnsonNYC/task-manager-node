const sgmail = require('@sendgrid/mail')

const sendgridAPIKey= process.env.SENDGRID_API_KEY

sgmail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgmail.send(
        {
            to:email,
            from: 'jkow95@gmail.com',
            subject: 'Thanks for joining us!', 
            text: `Welcome to the app, ${name}!`
        }
    )
}

const sendCancelEmail = (email, name) => {
    sgmail.send({
        to:email,
        from:'jkow95@gmail.com',
        subject: 'Cancellation Email',
        text: `Don't leave, ${name}!`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}