const jwt = require('jsonwebtoken');

class TokenService {
    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(" ");

            const token = bearer[1];

            req.token = token;

            next();

        } else {
            res.status(403).send('Forbidden');
        }
    }

    isAdmin(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(" ");

            const token = bearer[1];
            if (token && token !== "null") {
                const decode = jwt.decode(token);
                if (decode.roleId === 1) {
                    next();
                } else {
                    res.status(403).send('Forbidden');
                }

            } else {
                res.status(403).send('Forbidden');
            }
        } else {
            res.status(403).send('Forbidden');
        }
    }
}

module.exports = new TokenService();