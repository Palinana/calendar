const router = require('express').Router();

router.use('/events', require('./events'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});

module.exports = router;