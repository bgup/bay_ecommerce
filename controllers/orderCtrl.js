import Order from '../model/Order.js';
import asyncHandler from 'express-async-handler'

// @desc Create new order
// @route POST /api/v1/orders
// @access Private/Admin
export const createOrderCtrl = asyncHandler(async (req, res) => {
    res.json({
        status: 'success',
        message: 'ctrl order',
    });
});

// @desc Get brands
// @route GET /api/v1/brands
// @access Public
// export const getAllBrandsCtlr = asyncHandler(async (req, res) => {
//     const brands = await Brand.find();
//     res.json({
//         status: "success",
//         message: 'Brands fetching successfuly',
//         brands
//     });
// });

// // @desc Get single Brand
// // @route GET /api/v1/brands/:id
// // @access Public
// export const getBrandCtrl = asyncHandler(async (req, res) => {
//     const brand = await Brand.findById(req.params.id);
//     if (!brand) {
//         throw new Error('Brand no found.');
//     }
//     res.json({
//         status: 'success',
//         message: 'Brand fetched successfully',
//         brand
//     })
// });

// // @desc update single brand
// // @route PUT /api/v1/categories/:id
// // @access Private/Admin
// export const updateBrandCtrl = asyncHandler(async (req, res) => {
//     const { name } = req.body;
//     const brandUpdated = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
//     res.json({
//         status: 'success',
//         message: 'Brand updated successfully',
//         brandUpdated
//     });
// });

// // @desc delete brand
// // @route DELETE /api/v1/categories/:id
// // @access Private/Admin
// export const deleteBrandCtrl = asyncHandler(async (req, res) => {
//     await Brand.findByIdAndDelete(req.params.id);
//     res.json({
//         status: 'success',
//         message: 'Brand deleted successfully',
//     })
// });


