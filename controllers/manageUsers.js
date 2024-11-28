'use strict';

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const UserService = require('../services/userService');
const MANDATORY_HEADERS = ['name.firstName', 'name.lastName', 'age'];

const manageUser = async (req, res) => {
    try {
        let folderPath = path.join(__dirname, '../', process.env.UPLOAD_PATH);
        let filePath = path.join(folderPath, req.files[0].originalname);

        let fileData = await fs.readFileSync(filePath, 'utf8');

        let response = parseData(fileData);

        if (response.message) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ message: response.message });
        }

        await UserService.saveRecords(response.data);

        let distribution = await UserService.getDistribution();

        console.table(distribution, ['age_group', 'distribution'])

        return res.json({ message: 'Records uploaded successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const parseData = (data) => {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(field => field.trim()));

    if (!MANDATORY_HEADERS.every(k => headers.includes(k))) return { data: [], message: 'Mandatory headers are missing.' };

    if (rows.length === 0) return { data: [], message: 'File is empty. Please upload a valid file.' }

    let processedData = rows.map(row => {
        const obj = {};
        row.forEach((field, index) => {
            obj[headers[index]] = field;
        });
        return parseDotNotation(obj);
    });

    return { data: processedData, message: null };
}

function parseDotNotation(obj) {
    const result = {};
    for (const key in obj) {
        const keys = key.split('.');
        keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) acc[part] = obj[key];
            else acc[part] = acc[part] || {};
            return acc[part];
        }, result);
    }
    return result;
}

module.exports = manageUser;