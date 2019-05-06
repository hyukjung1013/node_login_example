const express = require('express');
const passport = require('../lib/passport');
const router = express.Router();
const db = require('../lib/lowdb');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login_process', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    })
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
}));

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup_process', (req, res) => {
    var body = req.body;
    var user = {
        email: body.email,
        password: body.password,
        nickname: body.nickname
    };
    db.get('users').push(user).write();
    req.login(user, function(err) {
        // Automatically logged in after signed up.
        return res.redirect('/');
    });    
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.save(function() {
        res.redirect('/');
    });
});

module.exports = router;