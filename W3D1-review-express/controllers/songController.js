const LabelModel = require('../models/labelModel')
const SongModel = require('../models/songModel')

class SongController {
    static findAllSong(req, res) {
        SongModel.findAll((err, data) => {
            if (err) res.send(err)
            else res.render('songList', { songs: data })
            //! render param ke 1 string => nama ejs
            //! kirim data di param ke 2 dari render
            //! bentuk datanya harus object
        })
    }

    static getEdit(req, res) {
        //! populate data => ambil data berdasarkan idnya
        //! id => req.params
        console.log(req.params) // object parms
        //! cari data yang id => req.params.id
        SongModel.findById(+req.params.id, (err, dataSong) => {
            if (err) res.send(err)
            else {
                //! cari data semua labels juga untuk di tampilkan di select
                LabelModel.findAll((err, labels) => {
                    if (err) res.send(err)
                    else res.render('songEdit', { dataSong, labels })
                })
            }
        })
    }

    static postEdit(req, res) {
        //! perhatikan isi dari params
        console.log(req.params)
        console.log(req.body) //! perhatikan isi dari keyword2 req.body
        let id = +req.params.id
        let { key1, key2, key3, key4 } = req.body
        SongModel.update(id, { key1, key2, key3, key4 }, (err, data) => {
            if (err) res.send(err)
            else res.redirect('/songs')
        })
    }
}

module.exports = SongController
