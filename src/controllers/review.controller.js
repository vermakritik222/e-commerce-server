const catchAsync = require('../utils/chtchasync');
const handlerFactory = require('../services/handlerFactory.service');
const Review = require('../models/review.model');
const AppError = require('../utils/appError');

exports.addReview = catchAsync(async (req, res, next) => {
    const { review, rating } = req.body;
    if (!review || !rating) {
        return next(new AppError('all fields arw required', 400));
    }

    if (rating * 1 > 5) {
        return next(
            new AppError('rating should be less then or equal to 5', 400)
        );
    }
    const newReview = await handlerFactory.createOne(Review, {
        product: req.params.productId,
        userName: req.user._id,
        review,
        rating,
    });

    res.status(201).json({
        status: 'success',
        review: newReview,
    });
});

exports.getAllReviews = catchAsync(async (req, res) => {
    const Reviews = await handlerFactory.getAll(Review, req.query);

    res.status(200).json({
        status: 'success',
        length: Reviews.length,
        Reviews,
    });
});

exports.getReviews = catchAsync(async (req, res) => {
    const Reviews = await handlerFactory.findById(Review, req.params.id);

    res.status(200).json({
        status: 'success',
        Reviews,
    });
});

exports.updateReviews = catchAsync(async (req, res) => {
    const Review = await handlerFactory.updateOne(
        Review,
        { _id: req.body.id },
        req.body
    );

    res.status(202).json({
        status: 'success',
        Review,
    });
});

exports.deleteReview = catchAsync(async (req, res) => {
    const Review = await handlerFactory.deleteOne(Review, req.params.id);

    res.status(202).json({
        status: 'success',
        Review,
    });
});
