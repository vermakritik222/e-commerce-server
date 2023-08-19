const express = require('express');
const addressControllers = require('../controllers/address.controller');
const authorizeMiddleware = require('../middleware/authorize.middleware');

const router = express.Router();

router.use(authorizeMiddleware.protect);

router
    .route('/address')
    .post(addressControllers.addAddress)
    .get(addressControllers.getAddress)
    .patch(addressControllers.updateAddress);

    router
    .route('/address/:id')
    .delete(addressControllers.deleteAddress)
    
module.exports = router;
