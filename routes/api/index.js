var router = require('express').Router()

router.use('/fan-profiles', require('./fanprofiles'))
router.use('/fan-tasks', require('./fantask'))
router.use('/periods', require('./period'))
router.use('/shutters', require('./shutter'))
router.use('/shutter-positions', require('./shutterposition'))
router.use('/shutter-profiles', require('./shutterprofile'))
router.use('/shutter-tasks', require('./shuttertask'))

module.exports = router