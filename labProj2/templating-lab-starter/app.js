// npm install -g nodemon
// npx nodemon app.js

const express = require('express');
const donutService = require('./lib/DonutService');
let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3001);

app.use(express.static(__dirname + '/public'));

// Middleware to handle donut filtering
app.use(function(req, res, next) {
	// TODO: If the user submits a "batter" query param,
	// call the getDonutsByBatter() method and get only those donuts.
	// Otherwise, call the getAllDonuts() method to get them all.
	// Store the donuts in "req.donuts"

	if (req.query.batter) {
		// populate with either a filter or all
		req.donuts = donutService.getDonutsByBatter(req.query.batter);
	}else {
		req.donuts = donutService.getAllDonuts();
	}
	next();
});

// TODO: Optional - what about filtering by topping as well? How can we do both?
app.use(function(req, res, next) {
	req.donuts = req.query.topping
		? req.donuts.filter(d => d.topping.filter( t => t.type === req.query.topping).length > 0 )
		: req.donuts;

	next();
})

// /?batter = chocolate&topping=sugar



app.get('/', function(req, res) {
	// Load the donut data from the donut service
	const donuts = donutService.getAllDonuts();

	res.render('home', {
		//regardless of postioning, this allows for robustness
		donuts: req.donuts
	});
});

// TODO: Add a JSON-based route here to return the same data as JSON
app.get('/api/donuts', function(req,res) {
	const donuts = donutService.getAllDonuts();
	res.json(donuts);

});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
