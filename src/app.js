const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
const universalMiddleware = require('./middleware/universal.middleware');
const authorizeMiddleware = require('./middleware/authorize.middleware');

// Routes
const healthCheckRoutes = require('./routes/healthCheck.routes');
const authRouter = require('./routes/auth.routes');
const addressRoutes = require('./routes/address.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');

// Global Error Handler
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appError');

const app = express();

app.use(cookieParser());

app.use(express.json({ limit: '10kb' }));
app.use(express.json());

// Serving static files
app.use(express.static(`${path.resolve(__dirname, `../public`)}`));

// CORS Middleware
app.use(
    cors({
        origin: ['*', 'http://localhost:3000'],
        credentials: true,
    })
    );

// custom middleware
app.use(universalMiddleware.sendTimeStamp);

// health check
app.use('/health-check', healthCheckRoutes);

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1', addressRoutes);
app.use('/api/v1', productRoutes);

app.use(authorizeMiddleware.protect);

app.use('/api/v1/me', userRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
