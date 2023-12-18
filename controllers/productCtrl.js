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

// @desc Get products
// @route GET /api/v1/products
// @access Public
export const getProductsCtrl = asyncHandler(async (req, res) => {
    //query
    let productQuery = Product.find();
    //search by name
    if (req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i" }
        })
    }
    const products = await productQuery;

    console.log(products);
    res.json({
        status: "success",
        products
    });

});





