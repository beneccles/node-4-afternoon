require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const checkForSession = require('./middlewares/checkForSession')
const auth = require('./controllers/authController')
const swag = require('./controllers/swagController')
const cart = require('./controllers/cartController')
const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
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

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))