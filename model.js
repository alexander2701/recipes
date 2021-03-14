
module.exports.getRecepeModel = function getModel() {

  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/recepesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const recepeSchema = new mongoose.Schema({
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

  return mongoose.model('Recepe', recepeSchema);
}
