var expressImport = require('express');
var bodyParser = require('body-parser');
var express = expressImport();

var port = 5000;

var pmRouter = require('./src/routes/pmRoutes');
var qaRouter = require('./src/routes/qaRoutes');
var heroRouter = require('./src/routes/heroRoutes');

express.use(expressImport.static('./src'));
express.use(expressImport.static('bower_components'));
express.use(expressImport.static('./node_modules'));
express.use(bodyParser.urlencoded({extended: true}));
express.use(bodyParser.json())

//express.set('views','./src/views');
//express.set('view engine', 'ejs');

express.use('/qa',qaRouter);
express.use('/pm',pmRouter);
express.use('/hero',heroRouter);
express.get('/*',function(req,res){
	res.sendFile('./src/index.html', {root: __dirname });
	//res.send('Main Page');
	//res.render('index',{
	//	list:['first val','second val','third val'],
	//	nav: [{link: 'pm', text:'Project Management'},
	//		  {link: 'qa', text:'Quality Assurance'}]
	//})
});


express.listen(port,function(err){
	console.log("Server is running on port: " + port);
});