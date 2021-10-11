const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

// ! middlewares
app.set('view engine', 'ejs') // No default engine was specified and no extension was provided.
app.use(express.urlencoded({ extended: false })) // error => gak bisa dapetin req.body
app.use('/', routes)

app.listen(port, () => console.log('i love you ', 3000))
