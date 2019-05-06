const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

app.use('/', pageRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('3000 port listening...');
});