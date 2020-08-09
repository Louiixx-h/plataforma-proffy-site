const express = require('express');
const server = express();
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./page')

// Configurar nunjucks(template engine)
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});

//servidor
server
// Receber dados do req.body
.use(express.urlencoded({ extended: true }))
// Configurar arquivos estáticos html, css imagem
.use(express.static('public'))
// Configurar rotas
.get('/', pageLanding)
.get('/give-classes', pageGiveClasses)
.get('/study', pageStudy)
.post('/save-classes', saveClasses)
.listen(5500);