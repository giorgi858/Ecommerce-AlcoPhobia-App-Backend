const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token  = authHeader.split(' ')[1];
    console.log(token);

    jwt.verify(
        token,
        process.env.ACC_T,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.userInfo.user
            req.roles = decoded.userInfo.roles
            next()
        }
    )

};

module.exports = verifyJWT;