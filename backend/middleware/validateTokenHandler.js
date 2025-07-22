import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler( async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    if(accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
            ignoreExpiration: true
        }, (err, decodedAccessToken) => {
            if(err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            const dateNow = Math.round(Date.now()/1000);
            if(decodedAccessToken.exp < dateNow) {
                jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefreshToken) => {
                    if(err) {
                        res.status(401);
                        throw new Error("User is not authorized");
                    }

                    if(decodedAccessToken.session_id === decodedRefreshToken.session_id && decodedRefreshToken.exp > dateNow) {
                        console.log("new access token generated!")
                        res.cookie("accessToken", jwt.sign({ user: decodedAccessToken.user, session_id: decodedAccessToken.session_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" }), {overwrite: true});
                    } else {
                        console.log("invalid refresh token!")
                        res.clearCookie("accessToken");
                        res.clearCookie("refreshToken");
                        res.status(401);
                        throw new Error("User is not authorized");
                    }
                });
            }

            req.user = decodedAccessToken.user;
            next();
        })
    } else {
        res.status(401);
        throw new Error("User is not authorized or accessToken is missing");
    }
})

export default validateToken;