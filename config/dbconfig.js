var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/testdb1');
mongoose.Promise = global.Promise;
var mongoSchema =   mongoose.Schema;
var studentSchema  = new mongoSchema(
	 {
		'name': String,
		'dept': String,
		'reg_no': String,
		'tag_no': Number
	},
	{collection:'student'}
);
module.exports = mongoose.model('student',studentSchema);