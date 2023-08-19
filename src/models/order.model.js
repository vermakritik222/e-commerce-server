const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'shippingAddress',
        select: 'address city state postalCode country phone altPhone',
    });
    next();
});

orderSchema.pre(/^findById/, function (next) {
    this.populate({
        path: 'item',
        select: 'title description price discountedPrice category stock images',
    });
    next();
});

module.exports = Order;
