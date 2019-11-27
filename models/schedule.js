const dataUtils = require('./data-utils')
const dbConn = require('./db');

class Schedule {
    constructor() {
        dbConn.getCon().then(db => {
            this.db = db;
        })
    }

    async getSchedules() {
        const sql = 'select rowid, * from schedule where rowid > 0 order by from_h, to_h';
        try {
            const rows = await this.db.all(sql, []);
            return Promise.resolve(rows.map(row => dataUtils.underscoreToPascalObject(row)))
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getSchedule(rowid) {
        const sql = 'select rowid, * from schedule where rowid = ?';
        const row = await this.db.get(sql, [rowid]);
        return Promise.resolve(dataUtils.underscoreToPascalObject(row));
    }

    async deleteSchedule(rowid) {
        try {
            await this.db.run('delete from schedule where rowid = ?', rowid)
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
                let res = await this.db.run(`insert into schedule (
                        from_h, to_h, start_period, working_period, use_lamp, lamp_corelation, shutter_1, shutter_2, shutter_3, temp_mode
               ) values  (?,?,?,?,?,?,?,?,?,?)`, [
                    data['from_h'],
                    data['to_h'],
                    data['start_period'],
                    data['working_period'],
                    data['use_lamp'],
                    data['lamp_corelation'],
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
                let res = await this.db.run(`update schedule set
                    from_h = ?, 
                    to_h = ?, 
                    start_period = ?,
                    working_period = ?,
                    use_lamp = ?,
                    lamp_corelation = ?,
                    shutter_1 = ?,
                    shutter_2 = ?,
                    shutter_3 = ?,
                    temp_mode = ?
                    WHERE rowid = ?`,
                    [
                        data['from_h'],
                        data['to_h'],
                        data['start_period'],
                        data['working_period'],
                        data['use_lamp'],
                        data['lamp_corelation'],
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
        if(data['to_h'] < 1 || data['to_h'] > 23) {
            errors.push({f:'toH', e:'Should be between 1 and 23'});
        }

        if(errors.length > 0 && data['from_h'] > data['to_h']) { 
            [data['from_h'], data['to_h']] = [data['to_h'], data['from_h']]
        }

        if(data['start_period'] < 0 || data['start_period'] > 59) {
            errors.push({f:'startPeriod', e:'Should be between 0 and 59'});
        }

        if(data['working_period'] < 0 || data['working_period'] > 59) {
            errors.push({f:'workingPeriod', e:'Should be between 0 and 59'});
        }

        return Promise.resolve(data);
    }
}

module.exports = new Schedule()