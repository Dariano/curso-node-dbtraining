const jwt = require('jwt-simple')

describe.only('ROUTER - Usuarios', () => {
    const Usuarios = models.Usuarios
    const jwtSecret = config.jwtSecret

    const usuarioPadrao = {
        id: 1,
        name: 'Usuario Padrão',
        email: 'teste@mail.com',
        password: 'test',
    }

    let token;

    beforeEach((done) => {
        Usuarios
            .destroy({ where: {} })
            .then(() => Usuarios.create({
                name: 'Joao',
                email: 'joao@mail.com',
                password: 'test123',
            }))
            .then(() => {
                Usuarios.create(usuarioPadrao)
                    .then((usuario) => {
                        token = jwt.encode({ id: usuario.id }, jwtSecret);

                        done();
                    });
            });
    });

    describe('Route GET /usuarios', () => {
        it('deve retornar uma lista de usuários', (done) => {
            request
                .get('/usuarios')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    expect(res.body[0].id).to.be.eql(usuarioPadrao.id);
                    expect(res.body[0].name).to.be.eql(usuarioPadrao.name);
                    expect(res.body[0].email).to.be.eql(usuarioPadrao.email);

                    done(err);
                });
        });
    });

});