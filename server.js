const path = require('path');
const consolidate = require('consolidate');
const express = require('express');
const mock = require('./src/app/data/mock.json');
const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'templates'));

//middlewares
app.use(express.static('dist'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

//default route
app.get('/', (req, res) => res.render('index', { title : 'Falabella Shopping Cart' }));

//your routes
app.get('/items', (req, res) => 
	setTimeout(() => res.json(mock) , 500)
);

//To return home page for invalid route requests
app.use(function(req,res,next){
	if (req.accepts(['html', 'json', 'text']) === "html") {
		res.render('index', { title : 'Falabella Shopping Cart' });
	}
	else {
		res.send({status:"ERROR" , type:'SERVER_ERROR' , message:"Invalid Resource Request"} , req , res);
	}
});
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () =>
  console.log(`Running app on ${listener.address().address}${listener.address().port}`));
