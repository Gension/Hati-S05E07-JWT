const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "ChangeMePlzzzz";
const expiry = process.env.JWT_EXPIRY || "7d";

let getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username
    }, secret, {
        expiresIn: expiry
    });
}

// MIDDLEWARE
let checkToken = (req, res, next) => {
    let token = req.headers.authorization; // "Bearer monToken"

    if (token) {
        token = token.replace("Bearer ", "") // "monToken"

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return next(new Error("Invalid token"));
            }

            req.decoded = decoded;
            next();
        });
    } else {
        res.status(403).json({
            message: "No token provided"
        });
    }
}

module.exports = {
    getToken,
    checkToken
}