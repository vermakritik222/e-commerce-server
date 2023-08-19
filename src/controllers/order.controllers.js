const catchAsync = require('../utils/chtchasync');
const Order = require('../models/order.model');
const handlerFactory = require('../services/handlerFactory.service');
const AppError = require('../utils/appError');

exports.placeOrder = catchAsync(async (req, res, next) => {
    const user = req.user;
    const { items, paymentMethod, shippingAddress } = req.body;

    if (!items || !paymentMethod || !shippingAddress) {
        next(new AppError('all fields are requires', 400));
    }
    if (!(items.length > 0)) {
        next(
            new AppError('items array should contain at least one product', 400)
        );
    }
    let totalAmount = 0;

    items.forEach((el) => {
        totalAmount += el.price * 1;
    });

    if (totalAmount <= 0) {
        next(new AppError('something went wrong', 400));
    }

    const order = await handlerFactory.createOne(Order, {
        user: user._id,
        items,
        totalAmount,
        paymentMethod,
        shippingAddress,
    });

    res.status(201).json({
        status: 'success',
        order,
    });
});

exports.getAddress = catchAsync(async (req, res) => {
    const address = await handlerFactory.findMany(Address, {
        userId: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        length: address.length,
        address,
    });
});

exports.updateAddress = catchAsync(async (req, res) => {
    const address = await handlerFactory.updateOne(
        Address,
        { _id: req.body.id },
        req.body
    );

    res.status(202).json({
        status: 'success',
        length: address.length,
        address,
    });
});

exports.deleteAddress = catchAsync(async (req, res) => {
    const { id } = req.params;
    const address = await handlerFactory.deleteOne(Address, id);

    res.status(201).json({
        status: 'success',
        address,
        id,
    });
});
