class Label {

}

class LabelDetail extends Label {

}

const fs = require('fs')
class LabelModel {
    // ! pool query => instantiate  new Label()
    // pool.query('...', (err, res) => {
    //     if (err) console.log(err)
    //     else {
    //          instantiate new Label()
    //          cb(null, data array of instance Label)
    // })
    static findAll(cb) {
        //! hanya sample tanpa DB
        fs.readFile('./data/labels.json', 'utf8', (err, data) => {
            if (err) cb(err)
            else cb(null, JSON.parse(data))
        })
    }
}

module.exports = LabelModel
