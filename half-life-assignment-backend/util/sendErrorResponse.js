module.exports = (res, msg) => {
    res.status(400);
    res.send({
        code: 400,
        message: msg
    });
}
