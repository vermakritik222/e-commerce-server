const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema();

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        items: [
            {
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
            },
        ],
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

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'shippingAddress',
        select: 'address city state postalCode country phone altPhone',
    });
    next();
});

orderSchema.pre(/^findOne/, function (next) {
    this.populate({
        path: 'items.product',
        select: 'title description price discountedPrice category stock images',
    });
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
