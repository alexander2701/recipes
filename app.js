const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const model = require(__dirname + '/model.js')
const Recepe = model.getRecepeModel()

const app = express();
const port = 3000;

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