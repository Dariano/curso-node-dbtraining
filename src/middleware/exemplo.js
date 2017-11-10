const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Middleware 1')
    if(!req.params.id > 0){
        res.json({ mensagem: 'Id do usuário inválido!'})
    }
    
    next();
});

app.use((err, req, res, next) => {
    console.log('Foi disparado um erro');
    res.status(500).send(err.message);
});

app.get('/usuario/:id', function (req, res, next) {
    console.log('Rota foi chamada');

    res.send('Olá pessoal!');
});


app.listen(3000, () => {
    console.log('app está rodando na porta 3000');
});
