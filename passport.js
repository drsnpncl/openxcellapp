var passport = require('passport')
var Strategy = require('passport-http').BasicStrategy
var user = require('./services/user')

passport.use(new Strategy(
    (username, password, done) => {
        user.authenticate(username, password).then(user => {
            if(user.message) {
                done(null, false, user.message)
            }
            if (user) {
                done(null, user)
            } else {
                done(null, false, 'Incorrect Username/password')
            }
        }).catch(err => {
            done(null, false, err)
        })
    }
));

module.exports = passport