const catchAsync = require('../utils/chtchasync');
const Address = require('../models/address.model');
const handlerFactory = require('../services/handlerFactory.service');

exports.addAddress = catchAsync(async (req, res) => {
    const user = req.user;
    const address = await handlerFactory.createOne(Address, {
        userId: user._id,
        ...req.body,
    });

    res.status(201).json({
        status: 'success',
        address,
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
