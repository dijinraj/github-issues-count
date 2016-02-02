var express = require('express');
var app = express();
var swig = require('swig');
var indexController = require("./controllers/indexController")

// START: view engine setup //
var swig = require('swig');
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', __dirname + '/views');
// END: view engine //

// Middle ware
app.use(function(req, res, next) {
	res.locals.title = "My App";
	next();
})

// Routes
app.get('/', indexController.home);
app.post('/', indexController.home);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});