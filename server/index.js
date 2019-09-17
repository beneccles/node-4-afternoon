// Server Setup Required
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const checkForSession = require('./middlewares/checkForSession')

// Controller Files
const auth = require('./controllers/authController')
const swag = require('./controllers/swagController')
const cart = require('./controllers/cartController')
const search = require('./controllers/searchController')
const { SERVER_PORT, SESSION_SECRET } = process.env

// Middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// Check the session, see if the user matches a previous one or 
// register a new user.
app.use(checkForSession)

//GET
app.get('/api/swag', swag.read);

//Authorize Endpoints
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)

//Cart Endpoints
app.post('/api/cart/checkout', cart.checkout)
app.post('/api/cart/:id', cart.add)
app.delete('/api/cart/:id', cart.delete)

//Search Endpoint
app.get('/api/search', search.search)

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))