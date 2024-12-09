const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors'); // Import the cors module

require('./app_api/models/db');
require('./app_api/config/passport');

const index = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

const app = express();

// Configure CORS
const allowedOrigins = ['http://localhost:4200', 'https://helloexpressrh.onrender.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add session middleware
app.use(
    session({
        secret: 'very secret key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: app.get('env') === 'production',
            httpOnly: true,
        },
    })
);

// Initialize Passport and bind to session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', index);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
