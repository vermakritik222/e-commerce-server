const express = require('express');
const productController = require('../controllers/product.controller');
const authorizeMiddleware = require('../middleware/authorize.middleware');

const router = express.Router();

router.use(authorizeMiddleware.protect);

router
    .route('/product')
    .post(productController.addProduct)
    .get(productController.getAllProducts);

router
    .route('/product/:id')
    .delete(productController.deleteProduct)
    .get(productController.getProducts)
    .patch(productController.updateProducts);

module.exports = router;
