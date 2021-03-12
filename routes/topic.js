var express = require('express');
var router = express.Router();
var { body, validationResult  } = require('express-validator'); 
var passport = require('../passport')
var Topic = require('../services/topic')

router.get('/user/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Topic.findByUserId(req.params.id).then(topic => {
            if(topic) {
                res.status(200).json(topic)
            } else {
                res.status(400).send('Topic not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Topic.findById(req.params.id).then(topic => {
            if(topic) {
                res.status(200).json(topic)
            } else {
                res.status(400).send('Topic not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Topic.findAll().then(topics => {
            if(topics) {
                res.status(200).json(topics)
            } else {
                res.status(400).send('No topic not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.post('/',
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('user').not().isEmpty().withMessage('Unauthorized user. Please Login'),
    (req, res) => {
        var errors = validationResult(req);
		if (!errors.isEmpty()) {
			var errArray = '';
			errors.array().forEach(err => {
				errArray = errArray + err.msg + ' ';
			});
			return res.status(400).json({ status: 'failure', message: errArray });
		} else {
            Topic.create(req.body).then(topic => {
                if(topic) {
                    res.status(200).json(topic)
                } else {
                    res.status(400).send('Topic not created')
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
        Topic.update(req.params.id, req.body).then(topic => {
            if(topic) {
                res.status(200).json(topic)
            } else {
                res.status(400).send('Topic not updated')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
) 

router.delete('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Topic.deleteTopic(req.params.id).then(topic => {
            if(topic) {
                res.status(200).json(topic)
            } else {
                res.status(400).send('Topic not deleted')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)
module.exports = router