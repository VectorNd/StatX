const jwt = require("jsonwebtoken");
const { ServerConfig } = require('../config');


async function verifyJwt(token) {
    try {
        const decoded = await jwt.verify(token, ServerConfig.JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function signJwt(payload) {
    try {
        const signedToken = await jwt.sign(payload, ServerConfig.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 }); // expires in 1 day
        return signedToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { verifyJwt, signJwt };