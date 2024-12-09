const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');

require('./app_api/models/db');
require('./app_api/config/passport');

const index = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

const app = express();

// SSL configuration
const privateKey = fs.readFileSync('./sslcert/key.pem', 'utf8');
const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8000);
httpsServer.listen(443);

// Configure CORS
const allowedOrigins = ['http://localhost:4200', 'https://helloexpressrh.onrender.com', 'http://localhost:8000', 'https://localhost', 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        console.log('Origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error('Blocked Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'very secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: app.get('env') === 'production',
        httpOnly: true,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', index);
app.use('/api', apiRoutes);

// 404 Handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
    if (req.originalUrl.startsWith('/api')) {
        // Send JSON response for API errors
        return res.status(err.status || 500).json({
            error: err.message,
            stack: req.app.get('env') === 'development' ? err.stack : undefined,
        });
    }
    // Render HTML error page for non-API routes
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).render('error');
});

module.exports = app;
