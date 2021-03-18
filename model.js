const mongoose = require('mongoose');
const fs = require('fs');


exports.getRecipeModel = function getRecipeModel() {

  mongoose.connect('mongodb://localhost:27017/recipesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const recipeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    type: String,
    preparationTime: Number,
    book: String,
    page: Number,
    favorite: Boolean,
    ingredients: {
      type: Array,
      "default": []
    },
    description: String
  });

  return mongoose.model('Recipe', recipeSchema);
}


exports.getDemoRecipes = function getDemoRecipes() {

  return new Promise((resolve, reject) => {
    fs.readFile('data/demo.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data))
    })
  })
}
