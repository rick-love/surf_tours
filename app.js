/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
// Logging to Console ONLY in development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Process JSON Data
app.use(express.json());

// Date
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mounting Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
