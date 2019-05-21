require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authContoller = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');



app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.get('/api/swag', swagController.read);
app.post('/api/register', authContoller.register);
app.post('/api/login', authContoller.login);
app.post('/api/signout', authContoller.signout);
app.get('/api/user', authContoller.getUser);

app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
app.get('/api/search', searchController.search);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`))


app.listen(SERVER_PORT, () => console.log(`🤙 Aloha and Mahalo on server ${SERVER_PORT}`))
