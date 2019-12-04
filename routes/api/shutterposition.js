var router = require('express').Router()
var db = require('../../models')

router.get('/', function (req, res, next) {
   db.ShutterPosition.findAll().then(result => {
    return res.json(result)
   })
   .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.ShutterPosition.findByPk(id).then((result) => {
    return res.json(result)  
  })
  .catch(next)
})

router.post('/', function (req, res, next) {
  db.ShutterPosition.create(req.body).then((result) => {
      return res.json(result)  
  })
  .catch(next);  
})

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.ShutterPosition.findByPk(id)
  .then((shutterPosition) => {
      const obj = Object.assign({}, req.body)
      delete obj['id'];
      return shutterPosition.update(obj).then((result) => {
        return res.json(result)  
    }).catch(next)  
    }).catch(next)  
})

router.delete('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    return db.ShutterPosition.findByPk(id)
    .then((shutterPosition) => shutterPosition.destroy())
    .then(() => res.send({ id }))
    .catch(next)

})

module.exports = router