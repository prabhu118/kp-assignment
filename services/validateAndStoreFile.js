'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const UPLOAD_PATH = process.env.UPLOAD_PATH;

const validate = (req, res, next) => {
    try {
        if (req.files?.length > 1) {
            return res.status(400).json({ message: 'You can only upload a maximum of 1 file at a time.' })
        }

        if (req.files?.length === 0 || !req.files) {
            return res.status(400).json({ message: 'File is required' });
        }

        if (req.files[0].mimetype !== 'text/csv') {
            return res.status(400).json({ message: 'Invalid file type. Please upload csv file.' })
        }

        if (!fs.existsSync(UPLOAD_PATH)) {
            fs.mkdirSync(path.join(__dirname, '../', UPLOAD_PATH), {recursive: true})
        }

        let filePath = path.join(UPLOAD_PATH, req.files[0].originalname)

        fs.writeFileSync(filePath, req.files[0].buffer, 'utf8')

        next();

    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = validate;