var router = require('express').Router()

router.use('/schedule', require('./schedule'))

module.exports = router