const pool = require('./config/connection')

const createPodHouseQuery = `
CREATE TABLE if not exists "ProductionHouses" (
	id serial PRIMARY KEY,
	"name_prodHouse" VARCHAR,
	headquarters VARCHAR
    );
`
const createMoviesQuery = `
CREATE TABLE if not exists "Movies" (
	id serial PRIMARY KEY,
	name VARCHAR,
	released_year INTEGER,
	genre VARCHAR,
	"ProductionHouseId" INTEGER,
		FOREIGN KEY ("ProductionHouseId")
		REFERENCES "ProductionHouses" ("id")
	);
`

pool.query(createPodHouseQuery, (err, res) => {
    if (err) console.log(err)
    else {
        console.log(res)
        pool.query(createMoviesQuery, (err, res) => {
            if (err) console.log(err)
            else {
                console.log(res)
                pool.end()
            }
        })
    }
})