const passport = require('passport')
const { Strategy, ExtractJwt} = require('passport-jwt')
const models = require('../models')
const config = require('../config/config')[process.env.NODE_ENV]

const Usuarios = models.Usuarios

class Auth {
    config() {
        let opts = {
            secretOrKey: config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }

        const strategy = new Strategy(opts, (payload, done) => {
            Usuarios
                .findById(payload.id)
                .then(usuario => {
                    if(!usuario) return done(null, false)

                    return done(null, {
                        id: usuario.id,
                        email: usuario.email
                    })
                })
        })

        passport.use(strategy)

        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    }
}

module.exports = new Auth()