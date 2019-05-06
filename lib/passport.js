const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./lowdb');

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser: ', id);
    done(null, dummyUser);
});

var dummyUser = {
    email: 'ronaldo@gmail.com',
    password: 'ronaldo',
    nickname: 'ronaldo'
};

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

module.exports = passport;