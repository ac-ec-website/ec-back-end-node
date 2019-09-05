const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')
const session = require('express-session')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 處理跨域問題
const origin = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://ec-website-api.herokuapp.com',
  'https://ac-ec-website.github.io'
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
    cookie: { maxAge: 8000000 },
    resave: false,
    saveUninitialized: true
  })
)

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/upload', express.static(__dirname + '/upload'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)

module.exports = app
