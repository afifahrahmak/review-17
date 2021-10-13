const { render } = require('ejs')
const Model = require('../models/model')

class Controller {
    static home(req, res) {
        res.render('home')
    }
    static listPH(req, res) {
        Model.findPh((err, data) => {
            if (err) res.send(err)
            else res.render('phList', { data })
        })
    }
    static listMovies(req, res) {
        Model.findMovies((err, data) => {
            if (err) res.send(err)
            else res.render('movieList', { data })
        })
    }
    static getAdd(req, res) {
        Model.findPh((err, data) => {
            if (err) cb(err)
            else res.render('movieAdd', { ph: data })
        })
    }
    static postAdd(req, res) {
        let { name, released_year, genre, ProductionHouseId } = req.body
        Model.create({ name, released_year, genre, ProductionHouseId }, (err) => {
            if (err) res.send(err)
            else res.redirect('/movies')
        })
    }
    static delete(req, res) {
        Model.destroy(+req.params.id, (err) => {
            if (err) res.send(err)
            else res.redirect('/movies')
        })
    }
    static getEdit(req, res) {
        Model.findById(+req.params.id, (err, movie) => {
            if (err) res.send(err)
            else {
                Model.findPh((err, data) => {
                    if (err) cb(err)
                    else res.render('movieEdit', { ph: data, movie })
                })
            }
        })
    }

    static postEdit(req, res) {
        Model.update(+req.params.id, req.body, (err) => {
            if (err) res.send(err)
            else res.redirect('/movies')
        })
    }
}



module.exports = Controller