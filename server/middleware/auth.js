const { verifyJwt } = require("../utils/jwt");

async function checkUserAuth(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("Missing bearer token");

        const tokenType = token.split(" ")[0];
        if (tokenType !== "Bearer") throw new Error("Invalid token types");

        const userJwt = token.split(" ")[1];
        const user = await verifyJwt(userJwt);
        if (!user) throw new Error(`Invalid Jwt ${token}`);
        console.log(user, user.userId)
        req.userId = user.userId;
        return next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Invalid Jwt" });
    }
};

module.exports = { checkUserAuth };