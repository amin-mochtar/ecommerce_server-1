require('dotenv').config()
const express = require('express')
const router = require('./routes')
const errorHandle = require("./middlewares/errorHandle.js");
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(router)
app.use(errorHandle)

app.listen(port, () => {
    console.log('berjalan di http://localhost:'+ port);
})

module.exports = app