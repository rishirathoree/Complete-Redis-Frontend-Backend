const {ApiError} = require('../lib/class.lib')

const FileNeededMiddleware = () => {
    return (req, res, next) => {
        if (!req.file  && !req.files) {
            return res.status(404).json(new ApiError(404, 'Files needed to access this routes', { msg: 'Files needed to access this routes' }))
        } else {
            next()
        }
    }
}


const TypeFileCheckerMiddleware = (type) => {
    return (req, res, next) => {
        if (!req.file && !req.files) {
            return next();
        }

        if (type === 'csv') {
            if (!req.file || req.file.mimetype !== 'text/csv') {
                throw new ApiError(400, "File must be a CSV");
            }
        } else if (type === 'image') {
            if (!req.file || !req.file.mimetype.startsWith('image')) {
                throw new ApiError(400, "File must be an image");
            }
        } else {
            throw new ApiError(400, "Invalid file type");
        }

        next();
    };
};


module.exports = { FileNeededMiddleware,TypeFileCheckerMiddleware}