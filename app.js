const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')
const session = require('express-session')

// 處理跨域問題
const origin = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://ec-website-api.herokuapp.com'
]
const corsOptions = {
  origin: origin,
  credentials: true,
  maxAge: 1728000
}

app.use(
  session({
    secret: 'gpw',
    name: 'gpw',
    cookie: { maxAge: 80000 },
    resave: false,
    saveUninitialized: true
  })
)

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)

module.exports = app
