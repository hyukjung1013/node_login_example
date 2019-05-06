const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// serializeUser() is called when login succeeds.
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);
    done(null, user.email);
    // 'user.email' is stored into session.passport.user.
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser: ', id);
    // Each time the client visits website, this is called.
    // 'user.email' is forwarded into id.
    
    // var user = db.get('users').find( { email: id } ).value();
    // done(null, user);
    
    done(null, dummyUser);
    // This will create req.user.
});

var dummyUser = {
    email: 'ronaldo@gmail.com',
    password: 'ronaldo',
    nickname: 'ronaldo'
}

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        if ( username === dummyUser.email) {
            if ( password === dummyUser.password) {
                return done(null, dummyUser);
                // It calls passport.serializeUser();
            } else {
                return done(null, false, { message: 'Incorrect Password' });
            }
        } else {
            return done(null, false, { message: 'Incorrect User'});
        }
    }
));

module.exports = passport;