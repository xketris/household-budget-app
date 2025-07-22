import asyncHandler from "express-async-handler";
import Group from "../models/groupModel.js"

const addGroup = asyncHandler(async (req, res) => {
    const { name, description, created_by, users } = req.body;
    if(!name || !created_by) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const groupAvailable = await Group.findOne({ name, created_by });
    if(groupAvailable) {
        res.status(400);
        throw new Error("Group with this name created by the same user already exists");
    }

    const group = await Category.create({
        name,
        description,
        created_by,
        users
    })

    if(group) {
        res.status(201).json({
            _id: category._id,
            name: category.name
        })
    } else {
        res.status(400);
        throw new Error("Group data is invalid");
    }
})

const getGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if(!group) {
        res.status(400);
        throw new Error("Group doesn't exists");
    }
    if(!group.users.contains(req.user._id)){
        res.status(400);
        throw new Error("User is not a part of the requested group");
    }
    res.status(200).json(group);
})

export { addGroup, getGroup };