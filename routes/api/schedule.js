var router = require('express').Router()
var schedule = require('../../models/schedule')

router.get('/', function (req, res, next) {
  schedule.getSchedules().then((result) => {
    return res.json(result);
  })
    .catch(next);
})

router.get('/:rowid', function (req, res, next) {
  schedule.getSchedule(req.params.rowid).then((result) => {
    return res.json(result);
  })
    .catch(next);
})

router.post('/', function (req, res, next) {
  schedule.saveSchedule(req.body).then((result) => {
    return res.json(result)
  })
    .catch(next);
})

router.put('/:rowid', function (req, res, next) {
  schedule.saveSchedule(req.body, req.params.rowid).then((result) => {
    return res.json(result)
  })
    .catch(next);
})

router.delete('/:rowid', function (req, res, next) {
  schedule.deleteSchedule(req.params.rowid).then((result) => {
    return res.status(202).json({})
  })
    .catch(next);
})


module.exports = router