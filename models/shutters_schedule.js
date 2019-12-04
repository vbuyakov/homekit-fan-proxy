const dataUtils = require('./data-utils')
const dbConn = require('./db');

class ShuttersSchedule {
    constructor() {
        dbConn.getCon().then(db => {
            this.db = db;
        })
    }

    async getSchedules() {
        const sql = 'select rowid, * from shutters_schedule where rowid > 0 order by from_h, to_h';
        try {
            const rows = await this.db.all(sql, []);
            return Promise.resolve(rows.map(row => dataUtils.underscoreToPascalObject(row)))
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getSchedule(rowid) {
        const sql = 'select rowid, * from shutters_schedule where rowid = ?';
        const row = await this.db.get(sql, [rowid]);
        return Promise.resolve(dataUtils.underscoreToPascalObject(row));
    }

    async deleteSchedule(rowid) {
        try {
            await this.db.run('delete from shutters_schedule where rowid = ?', rowid)
        } catch (error) {
            Promise.reject(error)
        }
    }

    async saveSchedule(data, rowid) {
        data = dataUtils.pascalToUnderscoreObject(data)
        let checkRes = await this.checkInsertionData(data, rowid)
        console.log('vDBG', 'checkRes', checkRes);

        if (!rowid) {
            try {
                let res = await this.db.run(`insert into shutters_schedule (
                        from_h, to_h, shutter_1, shutter_2, shutter_3, temp_mode
               ) values  (?,?,?,?,?,?)`, [
                    data['from_h'],
                    data['to_h'],
                    data['shutter_1'],
                    data['shutter_2'],
                    data['shutter_3'],
                    data['temp_mode']
                ])
                rowid = res.lastID;
            } catch (err) {
                return Promise.reject({ error: err, errorMsg: 'Unknown database error' })
            }
        } else {
            try {
                let res = await this.db.run(`update shutters_schedule set
                    from_h = ?, 
                    to_h = ?, 
                    shutter_1 = ?,
                    shutter_2 = ?,
                    shutter_3 = ?,
                    temp_mode = ?
                    WHERE rowid = ?`,
                    [
                        data['from_h'],
                        data['to_h'],
                        data['shutter_1'],
                        data['shutter_2'],
                        data['shutter_3'],
                        data['temp_mode'],
                        rowid
                    ])
                console.log('vDBG', 'res', res);

            } catch (err) {
                return Promise.reject('Unknown database error')
            }
        }
        return this.getSchedule(rowid)
    }

    async checkInsertionData(data, rowid) {
        let errors = [];
        if(data['from_h'] < 0 || data['from_h'] > 23) {
            errors.push({f:'fromH', e:'Should be between 0 and 23'});
        }
        if(data['to_h'] < 0 || data['to_h'] > 23) {
            errors.push({f:'toH', e:'Should be between 0 and 23'});
        }

        if(data['shutter_n1'] < 0 || data['shutter_n1'] > 90) {
            errors.push({f:'shutterN1', e:'Should be between 0 and 90'});
        }

        if(data['shutter_n2'] < 0 || data['shutter_n2'] > 90) {
            errors.push({f:'shutterN2', e:'Should be between 0 and 90'});
        }

        if(data['shutter_n3'] < 0 || data['shutter_n3'] > 90) {
            errors.push({f:'shutterN3', e:'Should be between 0 and 90'});
        }

        if(data['to_h'] != 0 && data['from_h'] > data['to_h']) { 
            [data['from_h'], data['to_h']] = [data['to_h'], data['from_h']]
        }

        if(errors.length == 0) {
            let to_h = data['to_h'] == 0 ? 24 : data['to_h']
            let query = `select count(*) as count from shutters_schedule 
            where (from_h <= ? and to_h > ?) or
            (from_h < ? and to_h > ?) or
            (from_h > ? and to_h < ?);
)`
            let row = await this.db.get(query, [data['from_h'],data['from_h'], to_h, to_h, data['from_h'], to_h]);
            console.log('vDBG', row);
            
        } 



        return Promise.resolve(data);
    }
}

module.exports = new Schedule()