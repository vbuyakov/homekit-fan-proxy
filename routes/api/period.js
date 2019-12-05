var router = require('express').Router()
var db = require('../../models')

router.get('/', function (req, res, next) {
   db.Period.findAll({
    order: [
      ['fromH', 'ASC'],
      ['toH', 'ASC'],
    ],
   }).then(result => {
    return res.json(result)
   })
   .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.Period.findByPk(id).then((result) => {
    return res.json(result)  
  })
  .catch(next)
})

router.post('/', function (req, res, next) {
  db.Period.create(req.body).then((result) => {
      return res.json(result)  
  })
  .catch(next);  
})

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.Period.findByPk(id)
  .then((period) => {
      const obj = Object.assign({}, req.body)
      delete obj['id'];
      return period.update(obj).then((result) => {
        return res.json(result)  
    }).catch(next)  
    }).catch(next)  
})

router.delete('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    return db.Period.findByPk(id)
    .then((period) => period.destroy())
    .then(() => res.send({ id }))
    .catch(next)

})

module.exports = router