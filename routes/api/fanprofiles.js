var router = require('express').Router()
var db = require('../../models')

router.get('/', function (req, res, next) {
   db.FanProfile.findAll().then(result => {
    return res.json(result)
   })
   .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.FanProfile.findByPk(id).then((result) => {
    return res.json(result)  
  })
  .catch(next)
})

router.post('/', function (req, res, next) {
  db.FanProfile.create(req.body).then((result) => {
      return res.json(result)  
  })
  .catch(next);  
})

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.FanProfile.findByPk(id)
  .then((fanProfile) => {
      const obj = Object.assign({}, req.body)
      delete obj['id'];
      return fanProfile.update(obj).then((result) => {
        return res.json(result)  
    }).catch(next)  
    }).catch(next)  
})

router.delete('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    return db.FanProfile.findByPk(id)
    .then((fanProfile) => fanProfile.destroy())
    .then(() => res.send({ id }))
    .catch(next)

})

module.exports = router