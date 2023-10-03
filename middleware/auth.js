const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'debugKey');
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).send({ code: 401, message: 'No tienes permiso :(' });
    }
}