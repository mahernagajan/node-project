function errorhandler(err, req, res, next) {
    console.error('Error:', err);

    const statusCode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';
    const data = err.data || null;

    return res.status(statusCode).json({
        data,
        status:{
            statuscode:statusCode,
            status:false,
            message
        },
    });
}

module.exports = errorhandler;
