const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const {db} = require('./models');
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.err(err);
  console.err(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error!');
});

db.sync({force: true})
.then(() => {
  console.log('db is synced!');
  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
})
.catch(console.error);

module.exports = app;
