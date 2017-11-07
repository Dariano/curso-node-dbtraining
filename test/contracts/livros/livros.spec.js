describe('Routes: Livros', () => {
    const Livros = models.Livros
    const livroPadrao = {
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro'
    }

    beforeEach(done => {
        Livros
            .destroy({ where: {}})
            .then(()=> Livros.create(livroPadrao))
            .then(() => done())
    });

    describe('GET /livros', () => {
        it('deve retornar uma lista de livros', done => {
            const livros = Joi.array().items(Joi.object().keys({
               id: Joi.number(),
               nome: Joi.string(),
               descricao: Joi.string(),
               created_at: Joi.date().iso(),
               updated_at: Joi.date().iso()
            }))
            
            request
                .get('/livros')
                .end((err, res)=> {                    
                    joiAssert(res.body, livros)
                    
                    done(err)
                })
        })
    })
})