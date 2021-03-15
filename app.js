const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const favicon = require('serve-favicon')
const model = require(__dirname + '/model.js')
const recipe = model.getrecipeModel()

const app = express();
const port = 3000;


app.use(favicon(__dirname + '/public/favicon.ico'))

app.listen(port, () => {
  console.log('Express server running on port ' + port)
});

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/fav', (req, res) => {
  let searchResult = [];
  recipe.find((err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      recipes.forEach(recipe => searchResult.push(recipe));
    }
    res.render('favorites', {
      searchResult: searchResult
    });
  });
});

app.get('/recipes', (req, res) => {
  let searchResult = [];
  recipe.find((err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      recipes.forEach(recipe => searchResult.push(recipe));
    }
    res.render('recipes', {
      searchResult: searchResult
    });
  });
});

app.get("/recipes/:item", (req, res) => {
  recipe.find((err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      recipe = recipes[0];
    }
    res.render('recipe', {
      recipe: recipe
    });
  });
});

app.post('/', (req, res) => {
  let searchValue = req.body.search;
  let searchResult = [];
  recipe.find((err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      recipes.forEach(recipe => searchResult.push(recipe));
    }
    res.render('recipes', {
      searchValue: searchValue,
      searchResult: searchResult
    });
  });
});
