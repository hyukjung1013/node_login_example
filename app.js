const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
    // 'session-file-store' store session data into files. (directory: __dirname/sessions/)
}));

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

app.use('/', pageRouter);
app.use('/auth', authRouter);

app.use('/session', (req, res) => {
    
    console.log('req.session: ', req.session);

    if (req.session.num === undefined)  
        req.session.num = 1;
    else    
        ++req.session.num;

    res.send(`req.session.num: ${req.session.num}`);
})

app.listen(3000, () => {
    console.log('3000 port listening...');
});