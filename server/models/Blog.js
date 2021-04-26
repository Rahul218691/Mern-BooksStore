const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true,
		trim:true
	},
	description:{
		type:String,
		required:true,
	},
	image:{
		type:String,
		required:true
	},
	views:{
		type:Number,
		default:0
	},
	author:{
		type:ObjectId,
		ref:'author',
		required:true
	},
	slug:{
		type:String,
		required:true
	}
},{
	timestamps:true
});

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;