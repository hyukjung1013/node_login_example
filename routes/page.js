const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.isLoggedIn) {
        res.render('main', { nickname: req.session.nickname });
    } else {
        res.render('main', { nickname: '' });
    }
});

module.exports = router;