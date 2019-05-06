const express = require('express');
const passport = require('../lib/passport');
const shortId = require('shortid');
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

router.get('/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
}));

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup_process', (req, res) => {
    var body = req.body;

    var previous_user = db.get('users').find( { email: body.email} ).value();
    if (previous_user) {
        previous_user.password = req.body.password;
        previous_user.displayName = req.body.displayName;
        db.get('users').find( {id: previous_user.id} ).assign(previous_user).write();

    } else {
        var user = {
            id: shortId.generate(),
            email: body.email,
            password: body.password,
            displayName: body.displayName
        };
        db.get('users').push(user).write();
    }
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