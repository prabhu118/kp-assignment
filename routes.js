'use strict';

const express = require("express");
const router = express.Router()
const multer = require('multer');
const manageUser = require('./controllers/manageUsers');
const validate = require('./services/validateAndStoreFile');

module.exports = (app) => {

    router.post('/upload', multer({limits: 1024 * 1024 * 10, files: 1}).any(), validate, manageUser);

    router.use('**', (req, res) => { return res.status(404).json({ message: "Route not found" }) });

    app.use(router);
};