import Color from '../model/Color.js';
import asyncHandler from 'express-async-handler'

// @desc Create new color
// @route POST /api/v1/colors
// @access Private/Admin
export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const colorFound = await Color.findOne({ name });
    if (colorFound) {
        throw new Error('Color already exist.');
    }
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthID
    })
    res.json({
        status: 'success',
        message: 'Color created successfully',
        color
    });
});

// @desc Get colors
// @route GET /api/v1/colors
// @access Public
export const getAllColorsCtlr = asyncHandler(async (req, res) => {
    const colors = await Color.find();
    res.json({
        status: "success",
        message: 'Colors fetching successfuly',
        colors
    });
});

// @desc Get single color
// @route GET /api/v1/colors/:id
// @access Public
export const getColorCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id);
    if (!color) {
        throw new Error('Color no found.');
    }
    res.json({
        status: 'success',
        message: 'Color fetched successfully',
        color
    })
});

// @desc update single color
// @route PUT /api/v1/colors/:id
// @access Private/Admin
export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const colorUpdated = await Color.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json({
        status: 'success',
        message: 'Color updated successfully',
        colorUpdated
    });
});

// @desc delete color
// @route DELETE /api/v1/colors/:id
// @access Private/Admin
export const deleteColorCtrl = asyncHandler(async (req, res) => {
    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: 'success',
        message: 'Color deleted successfully',
    })
});


