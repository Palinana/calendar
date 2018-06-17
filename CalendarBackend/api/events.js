const router = require('express').Router();
const {Event} = require('../models');

router.get('/', (req, res, next) => {
    Event.findAll()
    .then(events => res.json(events))
    .catch(next);
});

router.post('/', (req, res, next) => {
    Event.create(req.body)
    .then(event => res.json(event))
    .catch(next);
});

router.put('/events/:id', (req, res, next) => {
    req.event.update(req.body)
    .then(event => res.json(event))
    .catch(next);
});

router.delete('/events/:id', (req, res, next) => {
    const id = req.params.id;
    Event.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
  
module.exports = router;