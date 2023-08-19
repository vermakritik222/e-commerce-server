const catchAsync = require('../utils/chtchasync');
const Cart = require('../models/cart.model');
const handlerFactory = require('../services/handlerFactory.service');
const AppError = require('../utils/appError');

exports.addCartItem = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { product, quantity } = req.body;
    const cartItem = await handlerFactory.createOne(Cart, {
        user: _id,
        item:product,
        quantity,
    });

    res.status(201).json({
        status: 'success',
        product:cartItem,
    });
});

exports.getCart = catchAsync(async (req, res, next) => {
    const cartItems = await handlerFactory.findMany(Cart, {
        user: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        length: cartItems.length,
        cart: cartItems,
    });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
    const { quantity } = req.body;
    const { _id } = req.user;
    if (!quantity) {
       return next(new AppError('missing field "quantity"', 400));
    }
    const cartItem = await handlerFactory.updateOne(
        Cart,
        { user: _id },
        { quantity, updatedAt: new Date() }
    );

    res.status(202).json({
        status: 'success',
        cartItem,
    });
});

exports.deleteCartItem = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return next(new AppError('missing field cart item "id"', 400));
    }
    const cartItem = await handlerFactory.deleteOne(Cart, id);

    res.status(201).json({
        status: 'success',
        cartItem,
        id,
    });
});

exports.deleteCart = catchAsync(async (req, res) => {
    const { _id } = req.user;

    const cart = await handlerFactory.deleteMany(Cart, { user: _id });

    res.status(201).json({
        status: 'success',
        cart,
        id,
    });
});
