import asyncHandler from "express-async-handler";
import RefreshToken from "../models/refreshTokenModel.js";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler( async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let accessToken = authHeader && authHeader.split(' ')[1];
    if(accessToken) {
        try {
            const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });

            const dateNow = Date.now()/1000;
            console.log(decodedAccessToken, dateNow)
            if(decodedAccessToken.exp < dateNow) {
                try {
                    const decodedRefreshToken = await jwt.verify(req.headers["x-refresh-token"], process.env.REFRESH_TOKEN_SECRET, { ignoreExpiration: true});
                    const dbRefreshToken = await RefreshToken.findOne({ sessionId: decodedRefreshToken.sessionId });

                    if(decodedAccessToken.sessionId === decodedRefreshToken.sessionId && decodedRefreshToken.exp > dateNow && dbRefreshToken.valid) {
                        console.log("new access token generated!")
                        const newAccessToken = jwt.sign({ user: decodedAccessToken.user, sessionId: decodedAccessToken.sessionId }, process.env.ACCESS_TOKEN_SECRET, { 
                            expiresIn: "20000",
                        });
                        console.log(jwt.decode(newAccessToken, process.env.ACCESS_TOKEN_SECRET))
                        accessToken = newAccessToken;
                    } else {
                        if(dbRefreshToken.valid) {
                            dbRefreshToken.valid = false;
                            await dbRefreshToken.save();
                        }
                        console.log("invalid refresh token!");
                        res.status(401);
                        throw new Error("User is not authorized");
                    }
                } catch (e) {
                    res.status(401);
                    throw new Error("Refresh token is invalid");
                }
                
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