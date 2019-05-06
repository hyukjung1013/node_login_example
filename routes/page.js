const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.user) {
        res.render('main', { nickname: req.user.nickname });
    } else {
        res.render('main', { nickname: '' });
    }
});

module.exports = router;