var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var config = require('./config.js');
var util = require('util');

// Set an environment varaible on the machine for each config
if (process.env.NODE_ENV === 'aws') {
    var url = config.mongo.aws_url;
} else {
    var url = config.mongo.local_url;
}

// Connecting to MongoDB
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
	res.send("Health Check OK");
}

exports.getAll = function(req, res) {
	console.log("Getting All Resources");
	mongodb.collection('resources', function(err, collection) {
		collection.find({}).toArray(function (err, items) {
			res.send(items);
		});
	});
};

exports.getOneById = function(req, res) {
    var id = req.params.id;
    console.log("Getting Resource by id : " + id);
    mongodb.collection('resources', function (err, collection) {
        collection.find({"_id": new objectId(id)}).toArray(function (err, item) {
            console.log("Returning resource : " + util.inspect(item, false, null));
            res.send(item);
        });
    });
};

exports.createOne = function(req, res) {
    var body = req.body;
    console.log('Adding one resource: ' + JSON.stringify(body));

    mongodb.createCollection('resources', function (err, collection) {
        collection.insert(body, {safe: true}, function (err, result) {
            if (err) {
                console.log("Error posting data with error: " + util.inspect(err, false, null));
                res.status(500).send({Error: "Error adding an data to the resources collection"});
            } else {
                console.log("Success posting data with response: " + util.inspect(result.ops, false, null));
                res.send(result.ops);
            }
        });
    });
};

exports.deleteOneById = function(req,res) {
    var id = req.params.id;
    console.log("Deleting Resource by id : " + id);
    mongodb.collection('resources', function (err, collection) {
        collection.remove({_id:id}, function(err, result){
            if (err) {
                res.status(500).send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        })
    });
};

exports.updateOneById = function(req,res) {};