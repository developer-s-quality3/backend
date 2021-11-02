const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const morgan = require('morgan');
const cors = require('cors');
const passportSetup = require('./config/passport-setup');

//router imports
const oauthRouter = require('./routers/oauthRouter');
const userRouter = require('./routers/userRouter');

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// passport

// routes
app.use('/oauth', oauthRouter);
app.use('/user', userRouter);

module.exports = app;
