var expressImport = require('express');
var heroRouter = expressImport.Router();
var mongo = require('mongodb').MongoClient;

 var heroes = [
      { identifier: 0,  name: 'Zero' },
      { identifier: 11, name: 'Mr. Nice' },
      { identifier: 12, name: 'Narco' },
      { identifier: 13, name: 'Bombasto' },
      { identifier: 14, name: 'Celeritas' },
      { identifier: 15, name: 'Magneta' },
      { identifier: 16, name: 'RubberMan' },
      { identifier: 17, name: 'Dynama' },
      { identifier: 18, name: 'Dr IQ' },
      { identifier: 19, name: 'Magma' },
      { identifier: 20, name: 'Tornado' }
    ];

	
heroRouter.route('/').get(function(req,res){
	res.send('Hero Page');
});
	
heroRouter.route('/addData').get(function(req,res){
	var url = 'mongodb://localhost:27017/eventsApp';
	mongo.connect(url,function(err,db){
		var collection = db.collection('heroData');
		collection.insertMany(heroes,function(err,results){
			res.send(results);
			db.close();
		});
	});
});

heroRouter.route('/data').get(function(req,res){
	var url = 'mongodb://localhost:27017/eventsApp';
	mongo.connect(url,function(err,db){
		var collection = db.collection('heroData');
		collection.find({}).toArray(function(err, results){
			res.json(results);
			
			db.close();
			return res;
		});
	});
});

heroRouter.route('/data/search/:id').get(function(req,res){
	var id = req.params.id;
	var url = 'mongodb://localhost:27017/eventsApp';
	mongo.connect(url,function(err,db){
		var collection = db.collection('heroData');
		collection.find({"name":new RegExp(id,'i')}).toArray(function(err, results){			
			res.json(results);
			db.close();
			return res;
		});
	});
});

heroRouter.route('/data/:id').get(function(req,res){
	var id = req.params.id;
	var query={};
	if(!isNaN(id)){
		query["identifier"] = Number(id);}
	else{	
		query["name"] = id;}
	var url = 'mongodb://localhost:27017/eventsApp';
	mongo.connect(url,function(err,db){
		var collection = db.collection('heroData');
		
		collection.findOne(query,function(err, results){
			res.json(results);
			db.close();
			return res;
		});
	});
});

heroRouter.route('/data/:id').put(function(req,res){
	var id = req.params.id;
	var query={};
	if(!isNaN(id)){
		query["identifier"] = Number(id);}
	else{	
		query["name"] = id;}
	var hero = req.body;
	delete hero._id;
	var url = 'mongodb://localhost:27017/eventsApp';
	//res.send(hero);
	mongo.connect(url,function(err,db){
		var collection = db.collection('heroData');
		collection.update(query,{$set:hero}, {safe:false, multi:false},function(err, result){		
			 res.send((result===1)?'success':err)
			db.close();
			return res;
		});
	});
});

heroRouter.route('/data').post(function(req,res){

	var hero = req.body;
	var url = 'mongodb://localhost:27017/eventsApp';
	mongo.connect(url,function(err,db){
	var collection = db.collection('heroData');
		 collection.findOne({}, {sort: {'identifier': -1}},function(err, results){
			hero['identifier'] = results.identifier + 1;
			collection.insert(hero, {},function(err, result){		
				res.send(hero);
			});
			db.close();
		});

	 });
});

heroRouter.route('/data/:id').delete(function(req,res){
	
	var id = req.params.id;
	var query={};
	if(!isNaN(id)){
		query["identifier"] = Number(id);}
	else{	
		query["name"] = id;}
	var url = 'mongodb://localhost:27017/eventsApp';
	//res.send(hero);
	mongo.connect(url,function(err,db){
		var collection = db.collection('heroData');
		collection.remove(query,function(err, result){		
			 res.send((result===1)?'success':err)
			db.close();
			return res;
		});
	});
});


module.exports=heroRouter;