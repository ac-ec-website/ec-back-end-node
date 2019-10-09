const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const emailNotify = {
  sendEmail: (buyerEmail, emailSubject, emailContent) => {
    const oauth2Client = new OAuth2(
      process.env.clientId,
      process.env.clientSecret,
      'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.refreshToken
    })

    // const accessToken = oauth2Client.getAccessToken()

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_ACCOUNT,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken
      }
    })

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: buyerEmail,
      subject: emailSubject,
      generateTextFromHTML: true,
      html: emailContent
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response)
      smtpTransport.close()
    })
  }
}

module.exports = emailNotify
