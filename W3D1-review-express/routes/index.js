const router = require('express').Router()
const labelRoutes = require('./label')
const songRoutes = require('./song')


router.get('/', (req, res) => {
    res.render('home')
})

router.use('/labels', labelRoutes)
router.use('/songs', songRoutes)

module.exports = router
// kalau lupa bakal error => app.use() requires a middleware function
