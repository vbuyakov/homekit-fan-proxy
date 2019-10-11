var router = require('express').Router()

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./db/fans.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the fans database.');
});

router.get('/', function(req,res,next) {
    let sql = 'select * from settings';
    db.all(sql, [], (err, rows) => {
        if(err) {
            console.log('vDBG', 'error while get settings');
            res.status(500).json({err});
        }
        console.log('vDBG', rows[0]);
    })
    return res.json({lampOnUrl:'http://111.111.111.1/on'})
})

module.exports = router