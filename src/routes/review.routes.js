const express = require('express');
const reviewController = require('../controllers/review.controller.js');
const authorizeMiddleware = require('../middleware/authorize.middleware');

const router = express.Router();

router.use(authorizeMiddleware.protect);

router
    .route('/product/:productId/review')
    .post(reviewController.addReview)
    .get(reviewController.getAllReviews);

router
    .route('/review/:id')
    .patch(reviewController.updateReviews)
    .delete(reviewController.deleteReview)
    .get(reviewController.getReviews);

module.exports = router;
