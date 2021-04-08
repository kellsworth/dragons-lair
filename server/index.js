require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const PORT = 4000;

const app = express();

app.use(express.json());

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly.treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasure.Ctrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, treasureCtrl.getAllTreasure);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('db connected')
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

app.post('/auth/register', authCtrl.register);

app.listen(PORT, () => console.log(`Listening on por ${PORT}`))



