import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler( async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    if(accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
            ignoreExpiration: true
        }, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            const dateNow = Math.round(Date.now()/1000);
            if(decoded.exp < dateNow) {
                const decodedRefreshToken = jwt.decode(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);
                if(decoded.session_id === decodedRefreshToken.session_id && decodedRefreshToken.exp > dateNow) {
                    console.log("new access token generated!")
                    res.cookie("accessToken", jwt.sign({ user: decoded.user, session_id: decoded.session_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" }), {overwrite: true});
                } else {
                    console.log("invalid refresh token!")
                    res.clearCookie("accessToken");
                    res.clearCookie("refreshToken");
                    res.status(401);
                    throw new Error("User is not authorized");
                }
            }

            req.user = decoded.user;
            next();
        })
    } else {
        res.status(401);
        throw new Error("User is not authorized or accessToken is missing");
    }
})

export default validateToken;