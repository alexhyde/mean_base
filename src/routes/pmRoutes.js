var expressImport = require('express');
var pmRouter = expressImport.Router();

pmRouter.route('/').get(function(req,res){
	res.send('Project Management Page');
});

module.exports=pmRouter;