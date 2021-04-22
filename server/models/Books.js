const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;


const bookSchema = new mongoose.Schema({
	booktitle:{
		type:String,
		required:true,
		trim:true
	},
	bookauthor:{
		type:ObjectId,
		ref:'User',
		required:true
	},
	image:{
		type:String,
		required:true
	},
	bookdescription:{
		type:String,
		required:true
	},
	editorsChoice:{
		type:Boolean,
		default:false,
		required:true
	},
	downloads:{
		type:Number,
		default:0
	},
	comments:[
		{
			user:{
				type:ObjectId,
				ref:'User',
				required:true
			},
			comment:{
				type:String,
				required:true,
				trim:true
			},
			commentedOn:{
				type:Date,
				default:Date.now()
			}
		}
	],
	bookSlug:{
		type:String,
		required:true
	},
	genreSlug:{
		type:String
		required:true
	}
},{
	timestamps:true
});


const Book = mongoose.model('book',bookSchema);

module.exports = Book;