const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require("lodash");
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const model = require(__dirname + '/model.js');

const app = express();
const port = 3000;

let Recipe = model.getRecipeModel()

app.use(favicon(__dirname + '/public/favicon.ico'))

app.listen(port, () => {
  console.log('Express server running on port ' + port)
});

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.get('/', async (req, res) => {
  let demoRecipes = await model.getDemoRecipes();
  res.render('home', {
    demoRecipes: demoRecipes
  });
});

app.get('/fav', (req, res) => {
  let searchResult = [];
  Recipe.find({
    favorite: true
  }, (err, recipes) => {
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
  Recipe.find((err, recipes) => {
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
  Recipe.findOne({
    name: req.params.item
  }, (err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      recipe = recipes;
    }
    res.render('recipe', {
      recipe: recipe
    });
  });
});

app.post('/', (req, res) => {
  let searchValue = req.body.search;
  let searchResult = [];
  Recipe.find({
    "ingredients": {
      "$regex": searchValue,
      "$options": "i"
    }
  }, (err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      recipes.forEach(recipe => searchResult.push(recipe));
    }
    res.render('recipes', {
      searchValue: _.lowerCase(searchValue),
      searchResult: searchResult
    });
  });
});
