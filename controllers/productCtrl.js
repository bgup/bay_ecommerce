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
    };

    //search by brand
    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i" }
        })
    };

    //search by category
    if (req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i" }
        })
    };

    //search by sizes
    if (req.query.sizes) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.sizes, $options: "i" }
        })
    };

    //search by colors
    if (req.query.colors) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.colors, $options: "i" }
        })
    };

    //search by price range
    if (req.query.price) {
        const priceRange = req.query.price.split('-');
        productQuery = productQuery.find({
            // gte: greater or equal
            //lte: less than or equal
            price: { $gte: priceRange[0], $lte: priceRange[1] }
        })
    };

    //Pagination
    //page 
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    // limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //startIdx  
    const startIdx = (page - 1) * limit;
    //endIdx
    const endIdx = page * limit;
    //total
    const total = await Product.countDocuments();
    console.log(`startIdx: ${startIdx} endIdx: ${endIdx}`);
    //pagination result
    const pagination = {

    };
    if (endIdx < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIdx > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }


    productQuery = productQuery.skip(startIdx).limit(limit);


    const products = await productQuery;

    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: 'Products fetching successfuly',
        products
    });

});

// @desc Get single product
// @route GET /api/v1/products/:id
// @access Public
export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new Error('Product no found.');
    }
    res.json({
        status:'success',
        message:'Product fetched successfully',
        product
    })

});;






