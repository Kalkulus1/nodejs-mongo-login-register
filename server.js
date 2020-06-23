var app = require('express')();
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var setUpPassport = require('./config/setuppassport');
var routes = require('./routes/routes');
var dotenv = require('dotenv');
var logger = require('morgan');

dotenv.config();

mongoose.connect(process.env.MONGODBURL);

app.use(logger('dev'));

const port = process.env.PORT || 5000;
const host = "localhost";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    secret: 'THEJGAKLsjdfjhdjfhkY23y2kndu2?%#$(&bsfasjf',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

setUpPassport();

app.use(routes);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
