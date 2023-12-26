import asyncHandler from 'express-async-handler'
import Review from '../model/Review.js'
import Product from '../model/Product.js';

// @desc Create new review
// @route POST /api/v1/reviews
// @access Private/Admin
export const createReviewCtrl = asyncHandler(async (req, res) => {
    const { product, message, rating } = req.body;
    //1. Find the product 
    const { productID } = req.params;
    const productFound = await Product.findById(productID).populate('reviews');
    if (!productFound) {
        throw new Error('Product not found.');
    };
    //2. Check if user already reviewed this product
    const hasReviewed = productFound?.reviews?.find(review => {
        return review?.user?.toString() === req?.userAuthID?.toString();
    });
    if (hasReviewed) {
        throw new Error('The product already have a review.');
    };

    //3. Create review
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthID
    });
    productFound.reviews.push(review?._id);
    await productFound.save();


    res.status(201).json({
        status: true,
        message: 'Review created successfuly',

    });
});
