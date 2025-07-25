import asyncHandler from "express-async-handler";
import Group from "../models/groupModel.js"

const addGroup = asyncHandler(async (req, res) => {
    const { name, description, users } = req.body;
    if(!name) {
        res.status(400);
        throw new Error("All fields are required");
    }
    
    const groupAvailable = await Group.findOne({ name, createdBy: req.user.id });
    if(groupAvailable) {
        res.status(400);
        throw new Error("Group with this name created by the same user already exists");
    }

    console.log(req.user)
    
    const group = await Group.create({
        name,
        description,
        createdBy: req.user.id,
        users: [...(users || []), req.user.id]
    })
    
    if(group) {
        res.status(201).json({
            _id: group._id,
            name: group.name,
            description: group.description,
            createdBy: group.createdBy,
            users: group.users
        })
    } else {
        res.status(400);
        throw new Error("Group data is invalid");
    }
})

const getGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    if(!group) {
        res.status(400);
        throw new Error("Group doesn't exist");
    }
    console.log(group.users.includes(req.user.id))
    if(!group.users.includes(req.user.id)){
        res.status(400);
        throw new Error("User is not a part of the requested group");
    }
    res.status(200).json(group);
})

const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({ users: { "$in": [req.user.id] } });
    res.status(200).json(groups);
})

const deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    if(!group) {
        res.status(400);
        throw new Error("Group doesn't exist");
    }
    
    if(group.createdBy.toString() !== req.user.id){
        res.status(400);
        throw new Error("User is not a part of the requested group");
    }
    await Group.deleteOne({_id: req.params.groupId});
    res.status(200).json(group);
})

const updateGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    if(!group) {
        res.status(400);
        throw new Error("Group doesn't exist");
    }
    if(group.createdBy.toString() !== req.user.id){
        res.status(400);
        throw new Error("User is not a part of the requested group");
    }
    const newGroupData = await Group.findByIdAndUpdate( req.params.groupId, req.body,{ new: true })
    res.status(200).json(newGroupData);
})

export { addGroup, getGroup, deleteGroup, updateGroup, getGroups };