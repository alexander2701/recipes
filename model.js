
module.exports.getRecepeModel = function getModel() {

  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/fruitsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const recepeSchema = new mongoose.Schema({
    naam: {
      type: String,
      required: true
    },
    type: String,
    pagina: Number,
    bereidingstijd: Number,
    boek: String,
    ingredienten: {
      type: Array,
      "default": []
    }
  });

  const Recepe = mongoose.model('Recepe', recepeSchema);
  return Recepe;
}
