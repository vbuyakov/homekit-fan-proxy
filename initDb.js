const dbConf = require('./config/config.json');
const db = require('./models');

async function addTask(){
const profile = await db.FanProfile.create({name:"Summer"});
const period = await db.Period.create({name: "Early Morning", fromH: 6, toH: 8});
console.log('vDBG', profile);
console.log('vDBG', period);

}

async function addFanTask() {
    //const periods = await db.Period.findByPk(1);
    //const fanProfiles = await db.FanProfile.findByPk(1);
    await addTask();
    const fanTask = await db.FanTask.create({
        FanProfileId: 1,
        PeriodId: 1
    })
    console.log('vDBG', fanTask);
    
}

async function init() {
    await db.sequelize.sync({force: true})
    console.log('vDBG', 'DONE');
}

async function getTask() {
    const tasks = await db.FanTask.findAll({
        include: [ 
            {model: db.Period},
            {model: db.FanProfile}
        ]
    });
    console.log('vDBG', tasks[0].Period.name);
    console.log('vDBG', tasks[0].FanProfile.name);
    
}

getTask().then(()=>{
      console.log('vDBG', 'DONE');
});    