const catchAsync = require('../utils/chtchasync');
const Order = require('../models/order.model');
const handlerFactory = require('../services/handlerFactory.service');
const AppError = require('../utils/appError');

exports.placeOrder = catchAsync(async (req, res, next) => {
    const user = req.user;
    const { items, paymentMethod, shippingAddress } = req.body;

    if (!items || !paymentMethod || !shippingAddress) {
        return next(new AppError('all fields are requires', 400));
    }
    if (!(items.length > 0)) {
        return next(
            new AppError('items array should contain at least one product', 400)
        );
    }
    let totalAmount = 0;

    items.forEach((el) => {
        totalAmount += el.price * 1;
    });

    if (totalAmount <= 0) {
        return next(new AppError('something went wrong', 400));
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

exports.getOrder = catchAsync(async (req, res, next) => {
    const orders = await handlerFactory.getAll(Order, {
        user: req.user._id,
    });

    res.status(200).json({
        status: 'success',
        length: orders.length,
        orders,
    });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
    const { id, shippingAddress } = req.body;

    if (!shippingAddress) {
        return next(new AppError('all fields are required', 400));
    }

    const order = await handlerFactory.findById(Order, id);
    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    if (order.status !== 'pending') {
        return next(
            new AppError(
                'Order status is not pending. Update not allowed.',
                400
            )
        );
    }

    order.shippingAddress = shippingAddress
    
    await order.save();

    res.status(202).json({
        status: 'success',
        length: order.length,
        order,
    });
});

exports.getOrderDetails = catchAsync(async (req, res) => {
    const { id } = req.params;
    const order = await handlerFactory.findById(Order, id);

    res.status(201).json({
        status: 'success',
        params:id,
        order,
    });
});
