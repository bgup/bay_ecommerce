import Order from '../model/Order.js';
import asyncHandler from 'express-async-handler'
import User from '../model/User.js';
import Product from '../model/Product.js';

// @desc Create new order
// @route POST /api/v1/orders
// @access Private/Admin
export const createOrderCtrl = asyncHandler(async (req, res) => {
    //1. get the payload(customer, orderItems, shippingAddress, totalPrice)
    const { orderItems, shippingAddress, totalPrice } = req.body;
    //2. Find the user
    const user = await User.findById(req.userAuthID);
    //3. check if the order is not empty
    if (orderItems?.length <= 0) {
        throw new Error('No order items');
    };
    //4. create the order - save into DB
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice
    })

    //6. update product: totalQty, totalSold
    const products = await Product.find({ _id: { $in: orderItems } });
    orderItems?.map(async (orderItem) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === orderItem?._id?.toString();
        });
        if (product) {
            product.totalSold += orderItem.qty;
        }
        await product.save();
    });
    //5. Push order into User after update products
    user.orders.push(order?._id);
    await user.save();
    //7. make payment (stripe)
    //8. payment webhook
    //9. update the user order

    res.json({
        success:true,
        message: 'Order created',
        order,
        user
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


