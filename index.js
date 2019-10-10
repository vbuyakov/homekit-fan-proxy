const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let name = req.query.name;
    if (name) {
        res.send(`Hi, ${name}! How are you?`);
    } else {
        res.send('Hello World!')
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))