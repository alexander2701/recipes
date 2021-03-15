const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const favicon = require('serve-favicon')
const model = require(__dirname + '/model.js')
const Recepe = model.getRecepeModel()

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

// app.get('/recepten', (req, res) => {
//   res.render('recepten')
// });

app.post('/', (req, res) => {
  let searchValue = req.body.search;
  let searchResult = [];
  Recepe.find((err, recepes) => {
    if (err) {
      console.log(err);
    } else {
        recepes.forEach(recepe => searchResult.push(recepe));
    }
    res.render('recepten', {
      searchValue: searchValue,
      searchResult: searchResult
    });
  });

});
