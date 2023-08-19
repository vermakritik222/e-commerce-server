const express = require('express');
const orderControllers = require('../controllers/order.controllers');

const router = express.Router();

router
    .route('/')
    .post(orderControllers.placeOrder)
    // .get(orderControllers.getActiveOrder)
    // .patch(orderControllers.updateOrder);

// router.route('/:id').get(orderControllers.getOrderDetails);

// router.route('/history').get(orderControllers.getOrderHistory);

// router
//     .route('/archive/:id')
//     .patch(orderControllers.archiveOrder)
//     .get(orderControllers.getArchiveOrderDetails);

module.exports = router;
