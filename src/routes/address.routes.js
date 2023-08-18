const express = require('express');
const address = require('../controllers/address.controller');
const authorizeMiddleware = require('../middleware/authorize.middleware');

const router = express.Router();

router.use(authorizeMiddleware.protect);

router
    .route('/address')
    .post(address.addAddress)
    .get(address.getAddress)
    .patch(address.updateAddress);

    router
    .route('/address/:id')
    .delete(address.deleteAddress)
    
module.exports = router;
