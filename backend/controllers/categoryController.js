import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js"

const addCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if(!name) {
        res.status(400);
        throw new Error("Category name is required");
    }
    const categoryAvailable = await Category.findOne({ name });
    if(categoryAvailable) {
        res.status(400);
        throw new Error("Category already exists");
    }

    const category = await Category.create({
        name
    })

    if(category) {
        res.status(201).json({
            _id: category._id,
            name: category.name
        })
    } else {
        res.status(400);
        throw new Error("Category data is invalid");
    }
})

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
})

export { addCategory, getCategories };