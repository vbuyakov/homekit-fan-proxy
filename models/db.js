const Database = require('sqlite-async')


class DbConn {
  constructor() {
  }

  async getCon() {
    if (this.db) {
      console.log('vDBG', 'resolve null ??? ');
      
      return Promise.resolve(this.db);
    }
  
    this.db = await Database.open('./db/fans.db')
    return Promise.resolve(this.db);
  }
}



module.exports = new DbConn();