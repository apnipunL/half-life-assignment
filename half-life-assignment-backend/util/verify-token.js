const jwt = require("jsonwebtoken");
const constants = require("../const/constants");

module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], constants.JWT_SECRET, function (err, decode) {
            if (!err) {
                req.tokenUser = decode;
                next();
            } else {
                res.status(401)
                    .send({
                        code: 401,
                        message: 'Unauthorized'
                    });
            }
        });
    } else {
        res.status(401)
            .send({
                code: 401,
                message: 'Unauthorized'
            });
    }
};
