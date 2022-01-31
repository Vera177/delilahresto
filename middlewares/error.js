function handle(err, req, res, next) {
    const { status = 500, message = 'Error' } = err;
    return res.status(status).json({
        status,
        error: message
    });
}

module.exports = handle;