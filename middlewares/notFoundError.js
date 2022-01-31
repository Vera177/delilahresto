function handle(req, res, next) {
    res.status(404).send({
        status: 404,
        Message: 'Resource not found'
    });
};

module.exports = handle;