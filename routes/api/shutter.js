var router = require('express').Router()
var db = require('../../models')

router.get('/', function (req, res, next) {
   db.Shutter.findAll().then(result => {
    return res.json(result)
   })
   .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.Shutter.findByPk(id).then((result) => {
    return res.json(result)  
  })
  .catch(next)
})

router.post('/', function (req, res, next) {
  db.Shutter.create(req.body).then((result) => {
      return res.json(result)  
  })
  .catch(next);  
})

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.Shutter.findByPk(id)
  .then((shutter) => {
      const obj = Object.assign({}, req.body)
      delete obj['id'];
      return shutter.update(obj).then((result) => {
        return res.json(result)  
    }).catch(next)  
    }).catch(next)  
})

router.delete('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    return db.Shutter.findByPk(id)
    .then((shutter) => shutter.destroy())
    .then(() => res.send({ id }))
    .catch(next)

})

module.exports = router