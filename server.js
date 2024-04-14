const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const { checkDatabaseStatus } = require('./db/init');
const { query } = require('./db');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const PASSWORD = process.env.SITE_PASSWORD || '1234';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234';

const app = express();
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('assets'));

app.get('/admin', (req, res) => {
  res.render('admin/admin', {});
});

app.post('/admin/password', async (req, res) => {
  const { password } = req.body;

  if (password == ADMIN_PASSWORD) {
    const queryRes = await query('SELECT * from guest');

    const template = pug.compileFile('views/admin/admin-home.pug');

    const attendingGuests = queryRes.rows.filter((x) => x.attending === true);
    const notAttendingGuests = queryRes.rows.filter(
      (x) => x.attending === false,
    );

    const markup = template({
      guests: queryRes.rows,
      attendingGuests,
      notAttendingGuests,
    });

    res.send(markup);
  } else {
    res.sendStatus(403);
  }
});

app.get('/', (req, res) => {
  res.render('index', {});
});

app.post('/password', (req, res) => {
  const { password } = req.body;

  if (password == PASSWORD) {
    const home = pug.compileFile('views/home.pug');
    const markup = home({});

    res.send(markup);
  } else {
    res.sendStatus(403);
  }
});

app.post('/signup-again', (req, res) => {
  const view = pug.compileFile('views/signup-form.pug');
  const markup = view({ attending: true });

  res.send(markup);
});

app.post('/attending', (req, res) => {
  const view = pug.compileFile('views/signup-form.pug');
  const markup = view({ attending: true });

  res.send(markup);
});

app.post('/not-attending', (req, res) => {
  const view = pug.compileFile('views/signup-form.pug');
  const markup = view({ attending: false });

  res.send(markup);
});

app.post('/save-signup', (req, res) => {
  const { name, diet, greetings, attending } = req.body;
  console.log('Saving attendance from', req.socket.remoteAddress, req.body);

  query(
    `INSERT INTO GUEST (session_id, name, diet, other_information, attending) VALUES ($1, $2, $3, $4, $5)`,
    [req.socket.remoteAddress, name, diet, greetings, JSON.parse(attending)],
  );

  const view = pug.compileFile('views/signup-form.pug');
  const markup = view({
    name,
  });

  res.send(markup);
});

app.listen(PORT);
console.log('Listening on port: ' + PORT);

/** Comment this if you want to run without DB */
checkDatabaseStatus();
