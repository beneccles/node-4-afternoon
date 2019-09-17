require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()

app.use(express.json())

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} on station!`))