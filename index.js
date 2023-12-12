const express = require('express');
const server = express();
const filmes = require('./Src/data/filmes.json');

// Adicionando middleware para servir arquivos estáticos (CSS neste caso)
server.use(express.static('public'));

// Rota para exibir o formulário
server.get('/buscar-filme', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles.css">
            <title>Buscar Filme</title>
        </head>
        <body>
            <div class="container">
                <h1>Buscar Filme</h1>
                <form action="/filmes" method="get">
                    <label for="filmeId">Digite o ID do filme:</label>
                    <input type="text" id="filmeId" name="id" required>
                    <button type="submit">Buscar Filme</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Rota para exibir as informações do filme com base no ID fornecido
server.get('/filmes', (req, res) => {
    const { id } = req.query;

    if (id) {
        const filmeEncontrado = filmes.find(filme => filme.id === id);

        if (filmeEncontrado) {
            // Monta uma resposta em HTML com informações do filme
            const htmlResponse = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <title>Filme Encontrado</title>
                </head>
                <body>
                    <div class="container">
                        <h1>${filmeEncontrado.nome}</h1>
                        <img src="${filmeEncontrado.foto}" alt="${filmeEncontrado.nome}">
                        <p>${filmeEncontrado.descricao}</p>
                        <p>Elenco: ${filmeEncontrado.elenco}</p>
                        <a class="link-voltar" href="/buscar-filme">Voltar para a busca</a>
                        </div>
                </body>
                </html>
            `;

            return res.send(htmlResponse);
        } else {
            return res.status(404).json({ mensagem: 'Filme não encontrado' });
        }
    } else {
        return res.json({ mensagem: 'Por favor, forneça um ID de filme' });
    }
});

server.listen(3000, () => {
    console.log("Servidor Funcionando");
});

