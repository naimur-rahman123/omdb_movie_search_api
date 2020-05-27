const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('home'));

app.get('/results', (req, res) => {
    var searchTerm = req.query.search;
    request(`http://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`, function (
        error,
        response,
        body
    ) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render('results', { data: data });
        }
    });
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
