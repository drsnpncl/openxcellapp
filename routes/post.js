var express = require('express');
var router = express.Router();
var { body, validationResult  } = require('express-validator'); 
var passport = require('../passport')
var Post = require('../services/post')
var Topic =  require('../services/topic')

router.get('/user/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Post.findByUser(req.params.id).then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(400).send('Post not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/topic/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Post.findByTopic(req.params.id).then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(400).send('Post not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Post.findById(req.params.id).then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(400).send('Post not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.get('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Post.findAll().then(posts => {
            if(posts) {
                res.status(200).json(posts)
            } else {
                res.status(400).send('No post not found')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)

router.post('/',
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('topic').not().isEmpty().withMessage('Topic is required.'),
    body('user').not().isEmpty().withMessage('Unauthorized user. Please Login'),
    body('text').not().isEmpty().withMessage('Post can not be blank.'),
    (req, res) => {
        var errors = validationResult(req);
		if (!errors.isEmpty()) {
			var errArray = '';
			errors.array().forEach(err => {
				errArray = errArray + err.msg + ' ';
			});
			return res.status(400).json({ status: 'failure', message: errArray });
		} else {
            Topic.checkOwnership(req.body.topic, req.body.user).then(topic => {
                if(topic) {
                    Post.create(req.body).then(post => {
                        if(post) {
                            res.status(200).json(post)
                        } else {
                            res.status(400).send('Post not created')
                        }
                    }).catch(err => {
                        res.status(400).json(err)
                    })            
                } else {
                    res.status(400).json({ message: 'You are not authorized to post' })
                }
            })
        }
    }
)

router.put('/:id', 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Post.update(req.params.id, req.body).then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(400).send('Post not updated')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
) 

router.delete('/:id',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        Post.deletePost(req.params.id).then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(400).send('Post not deleted')
            }
        }).catch(err => {
            res.status(400).json(err)
        })
    }
)
module.exports = router