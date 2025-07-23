import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler( async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let accessToken = authHeader && authHeader.split(' ')[1];
    if(accessToken) {
        try {
            const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });

            const dateNow = Date.now()/1000;
            if(decodedAccessToken.exp < dateNow) {
                res.status(401);
                throw new Error("Access token is expired");
            }

            res.setHeader("x-access-token", accessToken);
            req.user = decodedAccessToken.user;
            next();
        } catch(e) {
            res.status(401);
            throw new Error("User is not authorized");
        }
    } else {
        res.status(401);
        throw new Error("User is not authorized or accessToken is missing");
    }
})

export default validateToken;