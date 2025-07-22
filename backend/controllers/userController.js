import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if(!first_name || !email || !password) {
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
        first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
        last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1),
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
        const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({
            accessToken
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