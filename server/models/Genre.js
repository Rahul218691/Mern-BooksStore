const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true,
		trim:true
	},
	poster:{
		type:String,
		required:true
	},
	genreSlug:{
		type:String,
		required:true
	}
},{
	timestamps:true
});


const Genre = mongoose.model('Genre',genreSchema);
module.exports = Genre;