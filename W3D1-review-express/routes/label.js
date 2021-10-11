const router = require('express').Router()
const Controller = require('../controllers/labelController')

router.get('/', (req, res) => {
    res.send('labels')
})

router.get('/detail', (req, res) => {
    res.send('labels')
})

module.exports = router
