import Product from '../model/Product.js';
import asyncHandler from 'express-async-handler'

// @desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, brand, category, sizes, colors, user, price, totalQty } = req.body;
    console.log(req.body);
    
    //product exist
    const productExist = await Product.findOne({ name });
    if (productExist) {
        throw new Error('Product already exist');
    }
    //create product 
    const product = await Product.create({
        name, description, brand, category, sizes, colors, user: req.userAuthID, price, totalQty
    });
    //push the product into category
    //send reponse
    res.json({
        status: "success",
        message: "Product created successfuly",
        product
    });
});




