const mongoose = require('mongoose');


const CarousalSchema = new mongoose.Schema({
	image:{
		type:String,
		required:true
	},
	title:{
		type:String,
		trim:true
	},
	content:{
		type:String
	}
},{
	timestamps:true
});


module.exports = mongoose.model('Slider',CarousalSchema);