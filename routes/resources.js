var mongoClient = require('mongodb').MongoClient;
var config = require(./config.js);

if (process.env.NODE_ENV === 'aws') {
    var url = config.mongo.aws_url;
} else {
    var url = config.mongo.local_url;
}

var mongodb;
mongoClient.connect(url, function (err, db) {
    if (!err) {
        console.log("Connected successfully to the starter-node-backend mongo db on " + url);
        mongodb = db;
    } else {
        console.log("Error connecting to the starter-node-backend mongo db on " + url)
    }
});

exports.getHealthCheck = function(req,res) {
	res.send("Welcome to the Starter-node-backend App");
}

exports.getAll = function(req, res) {
	console.log("Getting All Resources");
	mongodb.collection('resources', function(err, collection) {
		collection.find({}).toArray(function (err, items) {
			res.send(items);
		});
	});
};

exports.getOneById = function(req, res) {};
exports.createOne = function(req, res) {};
exports.deleteOneById = function(req,res) {};
export.updateOneById = function(req,res) {};

