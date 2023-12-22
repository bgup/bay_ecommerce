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
        name: name.toLowerCase(),
        user: req.userAuthID
    })
    res.json({
        status: 'success',
        message: 'Category created successfully',
        category
    });
});

// @desc Get categories
// @route GET /api/v1/categories
// @access Public
export const getAllCategoriesCtlr = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({
        status: "success",
        message: 'Categories fetching successfuly',
        categories
    });
});

// @desc Get single category
// @route GET /api/v1/categories/:id
// @access Public
export const getCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new Error('Category no found.');
    }
    res.json({
        status: 'success',
        message: 'Category fetched successfully',
        category
    })
});

// @desc update single category
// @route PUT /api/v1/categories/:id
// @access Private/Admin
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const categoryUpdated = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json({
        status: 'success',
        message: 'Category updated successfully',
        categoryUpdated
    });
});

// @desc delete category
// @route DELETE /api/v1/categories/:id
// @access Private/Admin
export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
        status: 'success',
        message: 'Category deleted successfully',
    })
});


