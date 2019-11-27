const conf = require('./config')
const express = require('express')
const uiApp = express()

var bodyParser = require('body-parser')
uiApp.use(bodyParser.json())

uiApp.get('/', (req, res) => {
    let name = req.query.name;
    if (name) {
        res.send(`Hi, ${name}! How are you?`);
    } else {
        res.send('Hello World!')
    }
})

uiApp.use(require('./routes'))
uiApp.use(logErrors)
uiApp.use(clientErrorHandler)

uiApp.listen(conf.uiAppPort, () => console.log(`Example uiApp listening on port ${conf.uiAppPort}!`))


function logErrors(err, req, res, next) {
    console.log('vDBG ERR::', err);
    next(err)
}

function clientErrorHandler (err, req, res, next) {
    let errorDetails = err.errorDetails || null
    let errorMsg = err.errorMsg || 'Something failed!';
    res.status(500).send({ errorMsg, errorDetails })
}


const proxyApp = express()

var bodyParser = require('body-parser')
proxyApp.use(bodyParser.json())

proxyApp.get('/', (req, res) => {
    let name = req.query.name;
    if (name) {
        res.send(`Hey men, ${name}! How are you?`)
    } else {
        res.send(`Hello World! It's me - Proxy!`)
    }
})

proxyApp.use(require('./routes'))

proxyApp.listen(conf.proxyAppPort, () => console.log(`Example proxyApp listening on port ${conf.proxyAppPort}!`))