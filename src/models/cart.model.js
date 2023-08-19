const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        createdAt: {
            type: Date,
            required: true,
            default:  new Date(),
        },
        updatedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'item',
        select: 'title description price discountedPrice category stock images',
    });
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
