const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./lowdb');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {
    console.log('deserializeUser: ', email);
    var user = db.get('users').find( {email: email} ).value();
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        console.log('LocalStratedy: ', email, password);
        var user = db.get('users').find( { email: email, password: password }).value();
        if (user)   
            return done(null, useyr, { message: 'Welcome.' })
        else        
            return done(null, false, { message: 'Incorrect User'});
    }
));

var facebookCredentials = require('../config/facebook');
passport.use(new FacebookStrategy(facebookCredentials,
    function(accessToken, refreshToken, profile, done) {
        console.log('FacebookStrategy: ');
        console.log('accessToke: ', accessToken);
        console.log('refreshToken: ', refreshToken);
        console.log('profile: ', profile);
    }
));

module.exports = passport;