'use strict';

const User = require('../models/users');

const saveRecords = (data) => {
    return User.bulkCreate(data);
}

module.exports = {saveRecords};