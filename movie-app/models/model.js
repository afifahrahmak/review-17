class ProductionHouse {
    constructor(obj) {
        this.id = obj.id
        this.name_prodHouse = obj.name_prodHouse
        this.headquarters = obj.headquarters
    }
}

class Movie {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.released_year = obj.released_year
        this.genre = obj.genre
        this.ProductionHouseId = obj.ProductionHouseId
        // untuk nyimpen name_prodHouse
        this.production_house = obj.production_house
    }
}

const pool = require('../config/connection')
class Model {
    static findPh(cb) {
        let query = `SELECT * FROM "ProductionHouses"
        ORDER BY "name_prodHouse" ASC`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                let data = res.rows.map(el => {
                    return new ProductionHouse(el)
                })
                cb(null, data)
            }
        })
    }

    static findMovies(cb) {
        let query = `SELECT m.*, p."name_prodHouse" as production_house FROM "Movies" m
        JOIN "ProductionHouses" p
        ON m."ProductionHouseId" = p.id
        ORDER BY m.released_year DESC
        `
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                let data = res.rows.map(el => {
                    return new Movie(el)
                })
                cb(null, data)
            }
        })
    }

    static create(obj, cb) {
        let errors = []
        if (!obj.name) errors.push('name is required')
        if (obj.released_year > new Date().getFullYear()) errors.push(`maksimal adalah tahun saat ini`)

        if (errors.length) {
            cb(errors)
        } else {
            let query = `INSERT INTO "Movies" (name, released_year, genre, "ProductionHouseId") VALUES ($1, $2, $3, $4)`
            let values = Object.values(obj)
            // ['fat pikachii', '2000', 'drama', '2']
            pool.query(query, values, (err, res) => {
                if (err) cb(err)
                else {
                    cb()
                }
            })
        }
    }

    static destroy(id, cb) {
        let query = `DELETE FROM "Movies" WHERE id=${id}`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else cb()
        })
    }

    static findById(id, cb) {
        let query = `SELECT * FROM "Movies" WHERE id=${id}`
        pool.query(query, (err, res) => {
            if (err) cb(err)
            else {
                let data = new Movie(res.rows[0])
                cb(null, data)
            }
        })
    }

    static update(id, obj, cb) {
        let query = `UPDATE "Movies" SET 
        name='${obj.name}',
        released_year=${obj.released_year},
        genre='${obj.genre}',
        "ProductionHouseId"=${obj.ProductionHouseId}
        WHERE id=${id}`
        pool.query(query, (err, res) => {
            console.log(err)
            if (err) cb(err)
            else cb()
        })
    }
}
module.exports = Model