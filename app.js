const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });
const cookieParser = require('cookie-parser');
const { deserializeUser } = require('./middleware/deserializeUser');

const app = express();

// DB connection
require('./db/sequelize');

// middlewares
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(deserializeUser);
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

//router imports
const authRouter = require('./routers/auth');
const userRouter = require('./routers/userRouter');
const writerRouter = require('./routers/writer.Router');

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/writer', writerRouter);

module.exports = app;
