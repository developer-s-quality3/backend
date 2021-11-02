const express = require('express');

const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

//router imports
const userRouter = require('./routers/userRouter');

dotenv.config('./config/env');

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/user', userRouter);

module.exports = app;
