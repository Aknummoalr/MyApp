const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

function authenticateToken(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: 'Unauthorized, no token Provided'});
    }

    jwt.verify(token, secretkey, (err, user) => {
        if(err){
            return res.status(403).json({message: 'Unauthorized, Invalid token'});
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;