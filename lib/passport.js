const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./lowdb');
const FacebookStrategy = require('passport-facebook').Strategy;
const shortId = require('shortid');

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
            return done(null, user, { message: 'Welcome.' })
        else        
            return done(null, false, { message: 'Incorrect User'});
    }
));

var facebookCredentials = require('../config/facebook');
// How to get email.
facebookCredentials.profileFields = ['id', 'email', 'name', 'displayName'];
passport.use(new FacebookStrategy(facebookCredentials,
    function(accessToken, refreshToken, profile, done) {
        var email = profile.emails[0].value;
        var user = db.get('users').find( { email: email } ).value();
        if (user) {
            user.facebookId = profile.id;
            db.get('users').find( {email: email} ).assign(user).write();
        } else {
            user = {
                id:shortId.generate(),
                email: email,
                displayName: profile.displayName,
                facebookId: profile.id
            }
            db.get('users').push(user).write(); 
        }
        done(null, user);
        // done(...) calls serializeUser(...)
    }
));

module.exports = passport;