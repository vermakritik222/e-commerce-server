const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        subDescription: String,
        price: {
            type: Number,
            required: true,
        },
        discountedPrice: Number,
        category: String,
        brand: String,
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        images: [
            {
                url: String,
                altText: String,
            },
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller',
        },
        variations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Variation', // Reference another model for variations
            },
        ],
        specifications: [
            {
                name: String,
                value: String,
            },
        ],
        size: [
            {
                type: String,
            },
        ],
        createdAt: { type: Date, default: new Date() },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
