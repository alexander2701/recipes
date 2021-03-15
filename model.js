
module.exports.getrecipeModel = function getModel() {

  const mongoose = require('mongoose');

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
    page: Number,
    preparationTime: Number,
    book: String,
    ingredients: {
      type: Array,
      "default": []
    }
  });

  return mongoose.model('Recipe', recipeSchema);
}
