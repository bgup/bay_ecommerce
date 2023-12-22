import Brand from '../model/Brand.js';
import asyncHandler from 'express-async-handler'

// @desc Create new brand
// @route POST /api/v1/brands
// @access Private/Admin
export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const brandFound = await Brand.findOne({ name });
    if (brandFound) {
        throw new Error('Brand already exist.');
    }
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthID
    })
    res.json({
        status: 'success',
        message: 'Brand created successfully',
        brand
    });
});

// @desc Get brands
// @route GET /api/v1/brands
// @access Public
export const getAllBrandsCtlr = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    res.json({
        status: "success",
        message: 'Brands fetching successfuly',
        brands
    });
});

// @desc Get single Brand
// @route GET /api/v1/brands/:id
// @access Public
export const getBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        throw new Error('Brand no found.');
    }
    res.json({
        status: 'success',
        message: 'Brand fetched successfully',
        brand
    })
});

// @desc update single brand
// @route PUT /api/v1/categories/:id
// @access Private/Admin
export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brandUpdated = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json({
        status: 'success',
        message: 'Brand updated successfully',
        brandUpdated
    });
});

// @desc delete brand
// @route DELETE /api/v1/categories/:id
// @access Private/Admin
export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status: 'success',
        message: 'Brand deleted successfully',
    })
});


