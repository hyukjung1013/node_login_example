const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.user) {
        res.render('main', { email: req.user.email });
    } else {
        res.render('main', { email: '' });
    }
});

module.exports = router;