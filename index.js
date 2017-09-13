require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(bodyParser.json());

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'server error' });
});

const server = app.listen(process.env.APP_PORT || 8888, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Listening at http://${host}:${port}`);
});
