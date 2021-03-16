
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
    preparationTime: Number,
    book: String,
    page: Number,
    favorite: Boolean,
    ingredients: {
      type: Array,
      "default": []
    }
  });

  return mongoose.model('Recipe', recipeSchema);
}
