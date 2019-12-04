var router = require('express').Router()
var db = require('../../models')

router.get('/', function (req, res, next) {
   db.FanTask.findAll({
    include: [ 
        {model: db.Period},
        {model: db.FanProfile}
    ]
  }).then(result => {
    return res.json(result)
   })
   .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.FanTask.findByPk(id,{
    include: [ 
        {model: db.Period},
        {model: db.FanProfile}
    ]
  }).then((result) => {
    return res.json(result)  
  })
  .catch(next)
})

router.post('/', function (req, res, next) {
  db.FanTask.create(req.body).then((result) => {
      return res.json(result)  
  })
  .catch(next);  
})

router.put('/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10)
  db.FanTask.findByPk(id)
  .then((fanTask) => {
      const obj = Object.assign({}, req.body)
      delete obj['id'];
      return fanTask.update(obj).then((result) => {
        return res.json(result)  
    }).catch(next)  
    }).catch(next)  
})

router.delete('/:id', function (req, res, next) {
    const id = parseInt(req.params.id, 10)
    return db.FanTask.findByPk(id)
    .then((fanTask) => fanTask.destroy())
    .then(() => res.send({ id }))
    .catch(next)

})

module.exports = router