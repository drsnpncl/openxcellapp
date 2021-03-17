var express = require('express');
var router = express.Router();
var { body, validationResult  } = require('express-validator'); 
var passport = require('../passport')
const User = require('../services/user');

router.get('/contact/:contact', 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        User.findByContact(req.params.contact).then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(400).send('User not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }

)

router.get('/email/:email',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        User.findByEmail(req.params.email).then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(400).send('User not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/username/:username',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        User.findByUsername(req.params.username).then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(400).send('User not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        User.findById(req.params.id).then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(400).send('User not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        User.findAll().then(users => {
            if(users) {
                res.status(200).json(users)
            } else {
                res.status(400).send('No user not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.post('/login',
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required.'),
    body('username').custom(value => {
        return User.findByUsername(value).then(user => {
          if (!user) {
            return Promise.reject('User Not Found. Please register first');
          }
        });
    }),
	(req, res) => {
        var errors = validationResult(req);
		if (!errors.isEmpty()) {
			var errArray = '';
			errors.array().forEach(err => {
				errArray = errArray + err.msg + ' ';
			});
			return res.status(400).json({ status: 'failure', message: errArray });
		} else {
			
            User.authenticate(req.body.username, req.body.password).then(user => {
                if(user) {
                    res.status(200).json(user)
                } else {
                    res.status(400).send('User not created')
                }
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
)

router.post('/',
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required.'),
    body('firstname').not().isEmpty().withMessage('First name is required'),
    body('lastname').not().isEmpty().withMessage('Last name is required.'),
    body('email').not().isEmpty().isEmail(),
    body('contact').not().isEmpty().withMessage('Contact number is required.'),
    body('email').custom(value => {
        return User.findByEmail(value).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
    }),
    body('contact').custom(value => {
        return User.findByContact(value).then(user => {
          if (user) {
            return Promise.reject('Contact already in use');
          }
        });
    }),
    body('username').custom(value => {
        return User.findByUsername(value).then(user => {
          if (user) {
            return Promise.reject('Username already in use');
          }
        });
    }),
    (req, res) => {
        var errors = validationResult(req);
		if (!errors.isEmpty()) {
			var errArray = '';
			errors.array().forEach(err => {
				errArray = errArray + err.msg + ' ';
			});
			return res.status(400).json({ status: 'failure', message: errArray });
		} else {
            User.create(req.body).then(user => {
                if(user) {
                    res.status(200).json(user)
                } else {
                    res.status(400).send('User not created')
                }
            }).catch(err => {
                res.status(400).json(err)
            })
        }
    }
)

router.put('/:id', 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        User.update(req.params.id, req.body).then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(400).send('User not updated')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
) 

module.exports = router