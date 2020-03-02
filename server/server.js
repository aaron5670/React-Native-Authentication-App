'use strict';
const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');

const mongoose = require('mongoose');
require('./database/model/users');
const db = mongoose.connection;
const Users = mongoose.model('Users');
const dbConfig = require('./config');

const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const authenticationMiddleware = require('./authentication/middleware');
const bcrypt = require('bcryptjs');

//Install middlewear
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    secret: 'DFJadslkfjgkf$%dfgjlsdg',
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Passport middleware for Authentication
passport.use(new LocalStrategy(
    function (username, password, done) {
        Users.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'username-incorrect'});
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: 'password-incorrect'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Create HTTP server by ourselves
const httpServer = http.createServer(app);

app.post('/login',
    passport.authenticate('local', {
        successFlash: 'Welcome!',
        failureFlash: true,
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })
);

app.get('/login', (req, res) => {
    res.json({
        success: false,
        logout: true,
        errorMsg: req.flash('error')
    });
});

app.post('/register', async (req, res) => {

    //If usernameCheck
    let usernameCheck = req.query.usernameCheck;
    if (usernameCheck) {
        let username = req.body.username;

        if (username !== '') {
            await Users.findOne({username: username}, function (err, user) {
                if (err) {
                    return res.json({
                        success: false,
                        error: true
                    });
                }
                if (!user) {
                    return res.json({
                        success: true,
                    });
                } else {
                    return res.json({
                        success: false,
                    });
                }
            })
        }
    }

    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;

    if (name && username && password) {

        await Users.findOne({username: username}, async function (err, user) {
            if (err) {
                return res.json({
                    success: false,
                    error: true
                });
            }
            if (!user) {
                const salt = bcrypt.genSaltSync(10);
                const user = new Users({
                    name: name,
                    username: username,
                    password: bcrypt.hashSync(password, salt)
                });

                user.save(function (err, fluffy) {
                    if (err) return console.error(err);
                });
                return res.json({
                    success: true,
                });
            } else {
                return res.json({
                    success: false,
                });
            }
        });
    }
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/dashboard', authenticationMiddleware(), (req, res) => {
    return res.json({
        success: true,
        username: req.session.passport.user.username,
        successMsg: req.flash('success')
    });
});

// Start the server.
const port = 3000;
httpServer.listen(port, () => {
    mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log(`Server started on port 3000`);
    });
});
