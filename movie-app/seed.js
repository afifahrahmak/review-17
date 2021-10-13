const pool = require('./config/connection');
const fs = require('fs');


let bulkInsert = `INSERT INTO "ProductionHouses" ("name_prodHouse", headquarters) VALUES`

let dataProdHouse = JSON.parse(fs.readFileSync('./productionHouses.json', 'utf-8'))

dataProdHouse = dataProdHouse.map(el => {
    return `('${el.name_prodHouse}', '${el.headquarters}')`
})

bulkInsert += dataProdHouse

pool.query(bulkInsert, (err, res) => {
    if (err) console.log(err)
    else {
        console.log(res)
        pool.end()
    }
})