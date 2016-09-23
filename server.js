var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var cors = require('cors');
app.use(cors());
var mongodb = require('./config/dbconfig');

app.use(bodyParser.urlencoded({"extended" : true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

router.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));


// Get api --- Get all students from database
router.route('/api/students')
	.get(function(req,res){
		var response = {};
		mongodb.find({},function(err,data){
			if(err){
				response = {"status" : false,"message" : "Error fetching data"};
			} else {
				 response = {"status" : true,"data" : data};
			}
			res.json(response);

		});

	});

// Post api --- save data to db
router.route('/api/students/add')
	.post(function(req,res){
		var db_inst = new mongodb();
		var response = {};
		db_inst.name = req.body.name;
		db_inst.dept = req.body.dept;
		db_inst.tag_no = req.body.tag_no;
		db_inst.reg_no = req.body.reg_no;

		db_inst.save(function(err,data){
			if(err) {
                response = {"status" : false,"message" : "Error adding data"};
            } else {
                response = {"status" : true,"data" : data};
            }
            res.json(response);

		});


	});

// Get via id ---
router.route('/api/student')
	.get(function(req,res){
		var response = {};
		var id = req.query.id;
		mongodb.findById(id,function(err,data){
			if(err){
				response = {'status':false,'message':'Failed to get record'};
			} else {
				response = {'status':true, 'data':data};
			}
			console.log('data--------------------------');
			console.log(data);
			res.json(response);

		})	

	});

// Post api --- Update 
router.route('/api/student/update')
	.post(function(req,res){
		var response = {};
		mongodb.findById(req.query.id,function(err,data){
			if(err){
				response = {'status':'Failed','Message':'Record does not exist'};
			} else {
				console.log('===================');
				console.log(data);
				data.name = req.body.name;
				data.dept = req.body.dept;
				data.reg_no = req.body.reg_no;
				data.tag_no = req.body.tag_no;

				data.save(function(error,result){
					if(err){
						response = {'status':false,'Message':'Failed to update'};
					} else {
						response = {'status':true,data:result};
					}
					res.json(response);

				});
			}

		})	

	});	

// Delete by id ---- 
router.route('/api/student/delete')
	.delete(function(req,res){
		var response = {};
		mongodb.findById(req.query.id,function(err,data){
			if(err){
				response = {'status': 'Failed', 'Message': 'Record not found'};
			} else {
				mongodb.remove({'_id':req.query.id},function(error){
					if(error){
						response = {'status':false,'Message':'Failed to delete'};
					} else {
						response = {'status':true,'Message':'Deleted Successfully'};
					}
					res.json(response)

				})

			}
		})

	})	


app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");