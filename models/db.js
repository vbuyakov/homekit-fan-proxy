const sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('./db/fans.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the fans database.');
  });

module.exports =  db;  