import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4"

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email: email.toLowerCase() });
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exists!");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email: email.toLowerCase(),
        password: hashedPassword
    });

    console.log("User created:", user)

    if(user) {
        res.status(201).json({
            id: user._id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        const sessionId = uuid();
        
        const accessToken = jwt.sign({
            sessionId: sessionId,
            user: {
                email: user.email,
                id: user._id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });
        
        const refreshTokenObj = {
            sessionId: sessionId,
            valid: true
        }
        
        const refreshToken = jwt.sign(refreshTokenObj, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME });

        await RefreshToken.create(refreshTokenObj);
        
        res.status(200).json({
            accessToken,
            refreshToken
        })
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body["refreshToken"];
    const accessToken = req.body["accessToken"];
    if(!refreshToken) {
        res.status(401);
        throw new Error("Refresh token is missing");
    }

    try {
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { ignoreExpiration: true });
        const session = await RefreshToken.findOne({ sessionId: decodedRefreshToken.sessionId });

        if(!session || !session.valid || decodedRefreshToken.exp < Date.now()/1000) {
            if(session && session.valid) {
                session.valid = false;
                await session.save();
            }

            res.status(401);
            throw new Error("Refresh token is expired or invalid");
        }

        
        if(decodedAccessToken.sessionId !== decodedRefreshToken.sessionId) {
            res.status(401);
            throw new Error("Access token and refresh token don't match");
        }
        const newAccessToken = jwt.sign({
            user: decodedAccessToken.user,
            sessionId: decodedAccessToken.sessionId,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });
        
        res.status(200);
        res.json({ accessToken: newAccessToken, refreshToken });
    } catch(e) {
        res.status(401);
        throw e;
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200);
    res.json(req.user)
})


export { registerUser, loginUser, currentUser, refreshAccessToken }