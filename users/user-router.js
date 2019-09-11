const router = require('express').Router();

const Users = require('./user-model.js');

const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
    // Stretch

    const {sub, department} = req.decodedToken;
    if (department) {
        Users.findBy({department})
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(500).send(err));
    } else {
        Users.findById(sub)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
    }
});

  
  module.exports = router;