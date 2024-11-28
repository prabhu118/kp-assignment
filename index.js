'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const port = process.env.PORT || 8080;
const app = express();

require('./routes')(app);

let server = http.createServer(app);

if (!server.listening) {
    server.listen(port, () => {
        console.log(`Server listening at port ${port}`)
    })
}