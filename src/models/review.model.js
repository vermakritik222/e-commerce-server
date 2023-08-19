const mongoose = require('mongoose');
const Product = require('./product.model');
const User = require('./user.model');

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        require: [true, 'pleas enter an review'],
    },
    rating: {
        type: Number,
    },
    ceratedAt: {
        type: Date,
        default: Date.now(),
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    },
    userName: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'userName',
        select: 'name photo',
    });
    next();
});
//  Schema | methods | function name
reviewSchema.statics.calcAverageRatings = async function (productId) {
    const stats = await this.aggregate([
        {
            // toureId is coming from review
            $match: { product: productId },
        },
        {
            // calculating statistics
            $group: {
                _id: '$product',
                nRating: { $sum: 1 },
                AvgRating: { $avg: '$rating' },
            },
        },
    ]);
    
    if (stats.length > 1) {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].AvgRating,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5,
        });
    }
};
// post me next function nahi hota
reviewSchema.post('save', function () {
    // this. constructor is used to use Review before it decelerade
    // calling above function
    this.constructor.calcAverageRatings(this.product);
});

// doing when documennt is updated
//findByIdAndUpdate |
//findByIdAndDelete | both are equal to  findOneAnd
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcAverageRatings(this.r.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;