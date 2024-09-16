const handleSequelizeValidationError = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(error => ({
            message: error.message,
            type: error.type,
            path: error.path,
            value: error.value,
            origin: error.origin,
            validatorKey: error.validatorKey,
            validatorName: error.validatorName,
            validatorArgs: error.validatorArgs,
        }));
        res.status(400).json({
            statusCode: 400,
            data: null,
            success: false,
            error: errors,
            message: 'Validation error',
        });
    } else {
        next(err);
    }
};

module.exports = {handleSequelizeValidationError}