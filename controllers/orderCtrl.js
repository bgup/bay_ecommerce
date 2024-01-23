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
    //2.1 check if user has shipping address
    if (!user.hasShippingAddress) {
        throw new Error('The user not has shipping address');
    }
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

// @desc    Get all orders of a specific user
//@route GET /api/v1/orders
//@access private
export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user');
    res.json({
        success: true,
        message:'All orders',
        orders
    })
});

//@desc get single order
//@route GET /api/v1/orders/:id
//@access private/admin

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    //send response
    res.status(200).json({
      success: true,
      message: "Single order",
      order,
    });
  });
