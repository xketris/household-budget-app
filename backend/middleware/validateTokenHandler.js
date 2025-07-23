import asyncHandler from "express-async-handler";
import RefreshToken from "../models/refreshTokenModel.js";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler( async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    if(accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
            ignoreExpiration: true
        }, async (err, decodedAccessToken) => {
            if(err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            const dateNow = Math.round(Date.now()/1000);
            if(decodedAccessToken.exp < dateNow) {
                jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decodedRefreshToken) => {
                    const dbRefreshToken = await RefreshToken.findById(decodedRefreshToken.sessionId);
                    if(err) {
                        res.status(401);
                        throw new Error("User is not authorized");
                    }

                    if(decodedAccessToken.sessionId === decodedRefreshToken.sessionId && decodedRefreshToken.exp > dateNow && dbRefreshToken.valid) {
                        console.log("new access token generated!")
                        const newAccessToken = jwt.sign({ user: decodedAccessToken.user, sessionId: decodedAccessToken.sessionId }, process.env.ACCESS_TOKEN_SECRET, { 
                            expiresIn: "5m",
                        });
                        res.setHeader("x-access-token", newAccessToken);
                    } else {
                        if(dbRefreshToken.valid) {
                            dbRefreshToken.valid = false;
                            await dbRefreshToken.save();
                        }
                        console.log("invalid refresh token!");
                        res.status(401);
                        throw new Error("User is not authorized");
                    }
                });
            }

            res.setHeader("x-access-token", accessToken);
            req.user = decodedAccessToken.user;
            next();
        })
    } else {
        res.status(401);
        throw new Error("User is not authorized or accessToken is missing");
    }
})

export default validateToken;