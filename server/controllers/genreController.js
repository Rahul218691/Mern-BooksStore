const asynchandler = require('express-async-handler');
const Genre = require('../models/Genre');
const fs = require('fs');
const slugify = require('slugify');

const resultPerPage = 12;

const getGenres = asynchandler(async(req,res) =>{
	const page = parseInt(req.query.page) || 1;
	const genres = await Genre.find({})
	.skip((resultPerPage * page) - resultPerPage)
	.limit(resultPerPage);
	const numOfGenres = await Genre.countDocuments();
	res.json({
		genres:genres,
		currentPage:page,
		pages:Math.ceil(numOfGenres / resultPerPage),
		numOfGenres:numOfGenres
	})
});

const addGenre = asynchandler(async(req,res) =>{
	const {title} = req.body;
	const lowerTitle = title.toLowerCase();
	if(!title){
		res.status(400)
        throw new Error('Genre title required')
	}
	if(!req.file){
		res.status(400)
        throw new Error('Please choose a image')
	}
	const file = req.file.filename;
	const fileUrl = `http://localhost:5000/genres/${file}`;
	const newGenre = await Genre.create({
		title,
		genreSlug:slugify(lowerTitle),
		poster:fileUrl
	});
	const page = 1;
	const numOfGenres = await Genre.countDocuments();

	res.json({
		genres:newGenre,
		pages:Math.ceil(numOfGenres / resultPerPage)
	});
})



const deleteGenre = asynchandler(async(req,res) =>{
	const {id} = req.params;
	const genre = await Genre.findById(id);
	 if(!genre){
    	res.status(400)
    	throw new Error('Genre not found')
  	}
  	const file = genre.poster;
  	const filename = file.split('genres/')[1];
  	fs.unlink(`/home/rahul/Projects/Mern/MyCodings/booksapp/server/public/genres/${filename}`,(err)=>{
  		if(err) console.log(err);
  	});
  	await Genre.deleteOne({_id:id});
  	res.json({message:'Genre deleted successfully'})
});


module.exports = {
getGenres,
addGenre,
deleteGenre
}