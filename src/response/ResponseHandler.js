const handler = (res, status, statusCode, description, data) => {
    return res.status(statusCode).json({
        data,
        status: {
            statusCode,
            status,
            description,
        }
    });
};
module.exports = handler;