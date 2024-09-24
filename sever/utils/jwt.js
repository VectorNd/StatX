const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;


async function verifyJwt(token) {
    try {
        const decoded = await jwt.verify(token, JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function signJwt(payload) {
    try {
        const signedToken = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 }); // expires in 1 day
        return signedToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { verifyJwt, signJwt };