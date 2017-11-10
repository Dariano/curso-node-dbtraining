const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const config = require('../config/config')

const models = require('../models')
const Usuarios = models.Usuarios

module.exports = (app) => {
    app.route('/token')
        .post((req, res) => {
            if (req.body.email && req.body.password) {
                const email = req.body.email;
                const password = req.body.password;

                Usuarios
                    .findOne({ where: { email}})
                    .then((usuarios) => {
                        if (bcrypt.compareSync(password, usuarios.password)) {
                            const payload = { id: data.id };
                            
                            return res.json({
                                token: jwt.encode(payload, config.secret)
                            });
                        } else {
                            return res.sendStatus(401);
                        }
                    })

            } else {
                res.sendStatus(401);
            }
        })
}