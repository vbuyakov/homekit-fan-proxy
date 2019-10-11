var router = require('express').Router()

router.use('/settings', require('./settings'))

module.exports = router