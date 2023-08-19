const express = require('express');
const cartControllers = require('../controllers/cart.controller');

const router = express.Router();

router
    .route('/')
    .post(cartControllers.addCartItem)
    .get(cartControllers.getCart)
    .patch(cartControllers.updateCartItem);
    
router.route('/:id').delete(cartControllers.deleteCartItem);

router.route('/remove-all').delete(cartControllers.deleteCart);

module.exports = router;
