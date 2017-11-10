module.exports = (app) => {
    app.route('/usuarios')
        .get((req, res) => {
            res.json([{
                id: 1,
                name: 'Usuario Padrão',
                email: 'teste@mail.com',
                password: 'test',
            }])
        })
}