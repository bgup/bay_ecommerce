import Category from '../model/Category.js';
import asyncHandler from 'express-async-handler'

// @desc Create new Category
// @route POST /api/v1/category
// @access Private/Admin
export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const categoryFound = await Category.findOne({ name });
    if (categoryFound) {
        throw new Error('Category already exist.');
    }
    const category = await Category.create({
        name,
        user: req.userAuthID
    })
    console.log(category.user);
    
    res.json({
        status:'success',
        message: 'Category created successfully',
        category
    });
});
