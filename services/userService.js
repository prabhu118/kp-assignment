'use strict';

const User = require('../models/users');
const sequelize = require('../config/dbConnection');

const BATCH_LIMIT = 10000;

const formatRecords = (records) => {
    return records.map(record => {
        let { name, address, age, ...rest } = record;
        const usersName = `${record.name.firstName} ${record.name.lastName}`;
        const usersAge = parseInt(record.age, 10);
        return { name: usersName, age: usersAge, address, additional_info: rest };
    });
};

const insertBatch = async (batch) => {
    const formattedRecords = formatRecords(batch);
    await sequelize.transaction(async (t) => {
        await User.bulkCreate(formattedRecords, { transaction: t });
    });
};

const saveRecords = async (data) => {
    for (let i = 0; i < data.length; i += BATCH_LIMIT) {
        const batch = data.slice(i, i + BATCH_LIMIT);
        await insertBatch(batch);
    }
}

const getDistribution = async () => {
    let query = `SELECT
        CASE 
            WHEN age < 20 THEN 1
            WHEN age < 40 THEN 2
            WHEN age < 60 THEN 3
            ELSE 4
        END AS index_no,
        CASE 
            WHEN age < 20 THEN '< 20'
            WHEN age < 40 THEN '20 to 40'
            WHEN age < 60 THEN '40 to 60'
            ELSE '> 60'
        END AS age_group,
        ROUND(COUNT(id) / SUM(COUNT(id)) OVER() * 100, 2) AS distribution
    FROM users
    GROUP BY index_no, age_group
    ORDER BY index_no`;

    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT});
}

module.exports = { saveRecords, getDistribution };