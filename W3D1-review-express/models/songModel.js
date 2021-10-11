class Song {

}

class SongDetail extends Song {

}

const pool = require('../config/connection')
const fs = require('fs')

class SongModel {
    static findAll(cb) {
        // ! pool query => instantiate  new Song()
        // pool.query('', (err, res) => {
        //     if (err) console.log(err)
        //     else cb(null, res.rows)
        // })
        fs.readFile('./data/songs.json', 'utf8', (err, data) => {
            if (err) cb(err)
            else cb(null, JSON.parse(data))
        })
    }

    static findById(id, cb) {
        //! pool.query('... JOIN Labels', (err, data) => instantiate new SongDetail() => cb())
        //! ini hanya sample tanpa DB, kalian harus menggunakan DB
        SongModel.findAll((err, data) => {
            if (err) cb(err)
            else {
                data = data.find(el => el.id == id)
                cb(null, data)
            }
        })
    }

    static update(id, data, cb) {
        //! lakukan pool.query update ke DB Table Songs where id = ${id}
    }
}

module.exports = SongModel
