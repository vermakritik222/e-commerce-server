const catchAsync = require('../utils/chtchasync');
const handlerFactory = require('../services/handlerFactory.service');
const Product = require('../models/product.model');

exports.addProduct = catchAsync(async (req, res) => {
    const product = await handlerFactory.createOne(Product, req.body);

    res.status(201).json({
        status: 'success',
        product,
    });
});

exports.getAllProducts = catchAsync(async (req, res) => {
    const products = await handlerFactory.getAll(Product, req.query);

    res.status(201).json({
        status: 'success',
        length: products.length,
        products,
    });
});

exports.getProducts = catchAsync(async (req, res) => {
    const products = await handlerFactory.findById(Product, req.params.id);

    res.status(201).json({
        status: 'success',
        products,
    });
});

exports.updateProducts = catchAsync(async (req, res) => {
    const product = await handlerFactory.updateOne(
        Product,
        { _id: req.params.id },
        req.body
    );

    res.status(201).json({
        status: 'success',
        product,
    });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    const product = await handlerFactory.deleteOne(Product, req.params.id);

    res.status(201).json({
        status: 'success',
        product,
    });
});
