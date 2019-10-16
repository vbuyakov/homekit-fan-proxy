const db  = require('./db');
const dataUtils = require('./data-utils')

class Settings {
    constructor() {

    }

    getSettings() {
        return new Promise(function (resolve, reject) {
            let sql = 'select * from settings';
            db.get(sql, [], (err, row) => {
                if (row) {
                    resolve(dataUtils.underscoreToPascalObject(row));
                } else {
                    resolve({});
                }
            })
        })
    }

    saveSettings(data) {
        data = dataUtils.pascalToUnderscoreObject(data)
        return new Promise(function (resolve, reject) {
            console.log('vDBG', data);

            db.serialize(() => {
                db.run('delete from settings')
                    .run(`insert into settings (
              fan_on_url, fan_off_url, fan_status_url, lamp_on_url, lamp_off_url, lamp_status_url, termometer_url
           ) values  (?,?,?,?,?,?,?)`, [
                        data['fan_on_url'],
                        data['fan_off_url'],
                        data['fan_status_url'],
                        data['lamp_on_url'],
                        data['lamp_off_url'],
                        data['lamp_status_url'],
                        data['termometer_url']
                    ], (err) => {
                        if (err) {
                            console.log('vDBG', err);
                            reject()
                        } else resolve();
                    })
            })
        })
    }
}

module.exports = new Settings()