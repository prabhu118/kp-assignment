'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const UPLOAD_PATH = process.env.UPLOAD_PATH;

const validate = (req, res, next) => {
    try {

        let errorMessage = null;

        if (req.files?.length === 0 || !req.files) errorMessage = 'File is required';

        if (req.files?.length > 1 && !errorMessage) errorMessage = 'You can only upload a maximum of 1 file at a time.'

        if (req.files?.[0]?.size === 0 && !errorMessage) errorMessage = 'File is empty. Please upload a valid file.';

        if (req.files?.[0]?.mimetype !== 'text/csv' && !errorMessage) errorMessage = 'Invalid file type. Please upload csv file.';

        if (errorMessage) return res.status(400).json({ message: errorMessage })

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