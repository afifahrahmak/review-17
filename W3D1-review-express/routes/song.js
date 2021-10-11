const router = require('express').Router()
const Controller = require('../controllers/songController')

router.get('/', Controller.findAllSong)

router.get('/add', (req, res) => {
    res.send('song get add')
})
router.post('/add', (req, res) => {
    res.send('song post add')
})

router.get('/:id', (req, res) => {
    res.send('song detail')
})

router.get('/:id/edit', Controller.getEdit)
router.post('/:id/edit', Controller.postEdit)

router.get('/:id/delete', (req, res) => {
    res.send('song delete')
})


module.exports = router
