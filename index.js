'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const multer = require('multer');
const port = process.env.PORT || 8080;
const app = express();

require('./config/dbConnection');
require('./routes')(app);

// app.use(multer().any());

let server = http.createServer(app);

app.on('ready', () => {
    if (!server.listening) {
        server.listen(port, () => {
            console.log(`Server listening at port ${port}`)
        })
    }
})