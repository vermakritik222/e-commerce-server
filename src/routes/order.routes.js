const express = require('express');
const orderControllers = require('../controllers/order.controllers');

const router = express.Router();

router
    .route('/')
    .post(orderControllers.placeOrder)
    .get(orderControllers.getOrder)
    .patch(orderControllers.updateOrder);

router.route('/:id').get(orderControllers.getOrderDetails);

module.exports = router;
