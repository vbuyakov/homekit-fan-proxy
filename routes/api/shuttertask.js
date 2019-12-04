var router = require('express').Router()
var db = require('../../models')

router.get('/', function (req, res, next) {
   db.ShutterTask.findAll({
    include: [ 
        {model: db.Period},
        {model: db.ShutterProfile},
        {model: db.ShutterPosition, include: [{
          model: db.Shutter
        }]}
    ]
  }).then(result => {
    return res.json(result)
   })
   .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.ShutterTask.findByPk(id,{
    include: [ 
        {model: db.Period},
        {model: db.ShutterProfile},
        {model: db.ShutterPosition, include: [{
          model: db.Shutter
        }]}
    ]
  }).then((result) => {
    return res.json(result)  
  })
  .catch(next)
})

router.post('/', function (req, res, next) {
  db.ShutterTask.create(req.body).then((result) => {
      return res.json(result)  
  })
  .catch(next);  
})

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.ShutterTask.findByPk(id)
  .then((shutterTask) => {
      const obj = Object.assign({}, req.body)
      delete obj['id'];
      return shutterTask.update(obj).then((result) => {
        return res.json(result)  
    }).catch(next)  
    }).catch(next)  
})

router.delete('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    return db.ShutterTask.findByPk(id)
    .then((shutterTask) => shutterTask.destroy())
    .then(() => res.send({ id }))
    .catch(next)
})

module.exports = router