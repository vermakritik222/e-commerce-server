const express = require('express');
const cartControllers = require('../controllers/cart.controller');

const router = express.Router();

router
    .route('/')
    .post(cartControllers.addCartItem)
    .get(cartControllers.getCart)
    .patch(cartControllers.updateCartItem);

router.route('/remove-all').delete(cartControllers.deleteCart);

router.route('/:id').delete(cartControllers.deleteCartItem);

module.exports = router;
