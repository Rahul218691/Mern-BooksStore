const asyncHandler = require('express-async-handler');
const Author = require('../models/Author');
const slugify = require('slugify')
const Book = require('../models/Books');

const getAuthors = asyncHandler(async(req,res) =>{
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;
	const authors = await Author.find({})
	.skip((limit * page) - limit)
	.limit(limit);
	const numOfAuthors = await Author.countDocuments();
	res.json({
		authors:authors,
		currentPage:page,
		pages:Math.ceil(numOfAuthors / limit),
		numOfAuthors:numOfAuthors
	});
})


const getSingleAuthor = asyncHandler(async(req,res) =>{
	const {author} = req.body;
	const authorResult = await Author.findOne({slug:author});
	if(!authorResult){
		res.status(400)
		throw new Error('Author not found')
	}
	res.json(authorResult);
});

	
const addAuthor = asyncHandler(async(req,res) =>{
	const {name,description} = req.body;
	const lowerdName = name.toLowerCase();
	if(!name || !description){
		res.status(400)
		throw new Error('All Fields are Required')
	}
	if(!req.file){
		res.status(400)
		throw new Error('Please Add Author Image')
	}
	const file = req.file.filename;
	const fileUrl = `http://localhost:5000/author/${file}`;
	const newAuthor = await Author.create({
		name,
		description,
		slug:slugify(lowerdName),
		image:fileUrl
	});

	const resultPerPage = 5;

	const countDoc = await Author.countDocuments();
	res.json({
		authors:newAuthor,
		pages:Math.ceil(countDoc / resultPerPage)
	});

})

const getAuthorNames = asyncHandler(async(req,res) =>{
	const authors = await Author.find({}).select('-image -slug -description -createdAt -updatedAt -__v');
	if(authors){
		res.json(authors)
	}
})


const getAuthorInfo = asyncHandler(async(req,res) =>{
	const {slug} = req.params;
	const author = await Author.findOne({slug});
	if(!author){
		res.status(400)
		throw new Error('Author not found')
	}
	const books = await Book.find({bookauthor:author._id,publish:true})
	.select('-bookdescription -comments -createdAt -updatedAt -__v -file -editorsChoice -downloads -publish -tags -genre -bookauthor');
	// console.log(books)
	res.json({
		author:author,
		books:books
	})
})

const editAuthor = asyncHandler(async(req,res) =>{
	
});

module.exports = {
getAuthors,
getSingleAuthor,
addAuthor,
getAuthorNames,
getAuthorInfo
}
