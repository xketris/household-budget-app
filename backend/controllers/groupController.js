import asyncHandler from "express-async-handler";
import Group from "../models/groupModel.js"

const addGroup = asyncHandler(async (req, res) => {
    const { name, description, users } = req.body;
    if(!name) {
        res.status(400);
        throw new Error("All fields are required");
    }
    
    const groupAvailable = await Group.findOne({ name, created_by: req.user.id });
    if(groupAvailable) {
        res.status(400);
        throw new Error("Group with this name created by the same user already exists");
    }

    const group = await Group.create({
        name,
        description,
        created_by: req.user.id,
        users: [...users, req.user.id]
    })
    
    if(group) {
        res.status(201).json({
            _id: group._id,
            name: group.name,
            description: group.description,
            created_by: group.created_by,
            users: group.users
        })
    } else {
        res.status(400);
        throw new Error("Group data is invalid");
    }
})

const getGroup = asyncHandler(async (req, res) => {
    console.log("eee")
    const group = await Group.findById(req.params.id);
    if(!group) {
        res.status(400);
        throw new Error("Group doesn't exists");
    }
    console.log(group.users.includes(req.user.id))
    if(!group.users.includes(req.user.id)){
        res.status(400);
        throw new Error("User is not a part of the requested group");
    }
    res.status(200).json(group);
})

export { addGroup, getGroup };