var router = require('express').Router()
var settings = require('../../models/settings')

router.get('/', function (req, res, next) {
  settings.getSettings().then((result) => {
    return res.json(result);
  })
    .catch(next);
})

router.post('/', function (req, res, next) {
  settings.saveSettings(req.body).then((result) => {
    return res.status(202).json({})
  })
    .catch(next);
})

module.exports = router