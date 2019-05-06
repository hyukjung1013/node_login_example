const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

var dummyUser = {
    email: 'ronaldo@gmail.com',
    password: 'ronaldo',
    nickname: 'ronaldo'
}

router.post('/login_process', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if ( email === dummyUser.email && password === dummyUser.password ) {
        req.session.isLoggedIn = true;
        req.session.nickname = dummyUser.nickname;
        req.session.save(() => {
            res.redirect('/');
        });
    } else {
        res.send('Wrong User Information');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
})

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;