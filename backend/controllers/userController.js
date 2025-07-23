import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4"

// @desc Register a user
// @route POST /api/users/register
// @access public
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
            _id: user._id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
})

// @desc Login user
// @route POST /api/users/login
// @access public
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
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );
        const refreshTokenObj = {
            sessionId: sessionId,
            valid: true
        }

        
        const refreshToken = jwt.sign(refreshTokenObj, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "180d" });

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

// @desc Current user info
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


export { registerUser, loginUser, currentUser }