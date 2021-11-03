const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./config/passport-setup');

const sequelize = require('./db/sequelize');

const app = express();

// DB connection
require('./db/sequelize');

// middlewares
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
// passport
app.use(passport.initialize());
app.use(passport.session());

//router imports
const oauthRouter = require('./routers/oauthRouter');
const userRouter = require('./routers/userRouter');

// routes
app.use('/oauth', oauthRouter);
app.use('/user', userRouter);

module.exports = app;
