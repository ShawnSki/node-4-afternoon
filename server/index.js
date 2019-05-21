require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authContoller = require('./controllers/authController');


app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use(checkForSession);
app.get('/api/swag', swagController.read);
app.post('/api/register', authContoller.register);
app.post('/api/login', authContoller.login);
app.post('/api/signout', authContoller.signout);
app.get('/api/user', authContoller.getUser);



app.listen(SERVER_PORT, () => console.log(`🤙 Aloha and Mahalo on server ${SERVER_PORT}`))
