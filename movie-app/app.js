const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', Controller.home)
app.get('/production-houses', Controller.listPH)

app.get('/movies', Controller.listMovies)
app.get('/movies/add', Controller.getAdd)
app.post('/movies/add', Controller.postAdd)
app.get('/movies/delete/:id', Controller.delete)
app.get('/movies/edit/:id', Controller.getEdit)
app.post('/movies/edit/:id', Controller.postEdit)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})