var expressImport = require('express');
var qaRouter = expressImport.Router();

qaRouter.route('/').get(function(req,res){
	res.send('Quality Assurance Page');
});

module.exports=qaRouter;