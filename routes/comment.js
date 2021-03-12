var express = require('express');
var router = express.Router();
var { body, validationResult  } = require('express-validator'); 
var passport = require('../passport')
var Comment = require('../services/comment')

router.get('/user/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Comment.findByUser(req.params.id).then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(400).send('Comment not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/post/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Comment.findByPost(req.params.id).then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(400).send('Comment not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Comment.findById(req.params.id).then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(400).send('Comment not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Comment.findAll().then(comments => {
            if(comments) {
                res.status(200).json(comments)
            } else {
                res.status(400).send('No comment not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.post('/',
    body('post').not().isEmpty().withMessage('Post is required.'),
    body('user').not().isEmpty().withMessage('Unauthorized user. Please Login'),
    body('text').not().isEmpty().withMessage('Comment can not be blank.'),
    (req, res) => {
        var errors = validationResult(req);
		if (!errors.isEmpty()) {
			var errArray = '';
			errors.array().forEach(err => {
				errArray = errArray + err.msg + ' ';
			});
			return res.status(400).json({ status: 'failure', message: errArray });
		} else {
            Comment.create(req.body).then(comment => {
                if(comment) {
                    res.status(200).json(comment)
                } else {
                    res.status(400).send('Comment not created')
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
        Comment.update(req.params.id, req.body).then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(400).send('Comment not updated')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
) 

router.delete('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Comment.deleteComment(req.params.id).then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(400).send('Comment not deleted')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)
module.exports = router