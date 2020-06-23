const express = require('express')
const fs = require('fs')
const readLastLines = require('read-last-lines');

const app = express()
const port = 3001

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/weather', (req, res) => {
    readLastLines.read('../hardware_src/dane.txt', 1).then((lines) => res.send(lines))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))