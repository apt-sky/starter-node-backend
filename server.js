var express = require('express');
var resources = require('./routes/resources.js')
var bodyParser = require('body-parser');

var rootapp = express();
var app = express();

rootapp.use(bodyParser.json());
rootapp.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Context-Type, Accept");
	next();
});

app.get('/health', resources.getHealthCheck);
app.get('/resources', resources.getAll);
app.get('/resources/:id', resources.getOneById)
app.post('/resources', resources.createOne);
app.delete('/resources/:id', resources.deleteOneById);
app.put('/resources/:id', resources.updateOneById);

rootapp.use('/starter-node-backend', app);

var server = rootapp.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Starter-node-backend app listening at http://%s:%s', host, port);
});
