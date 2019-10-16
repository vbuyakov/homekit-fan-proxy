const conf = require('./config')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    let name = req.query.name;
    if (name) {
        res.send(`Hi, ${name}! How are you?`);
    } else {
        res.send('Hello World!')
    }
})

app.use(require('./routes'))

app.listen(conf.port, () => console.log(`Example app listening on port ${conf.port}!`))