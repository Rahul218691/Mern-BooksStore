const asyncHandler = require('express-async-handler');
const Book = require('../models/Books');
const slugify = require('slugify');

const getbooks = asyncHandler(async(req,res) =>{
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 12;
	const books = await Book.find({})
	.skip((limit * page) - limit)
	.limit(limit)
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	const numOfBooks = await Book.countDocuments();
	res.json({
		books:books,
		currentPage:page,
		pages:Math.ceil(numOfBooks / limit),
		numOfBooks:numOfBooks
	});
});

const uploadBook = asyncHandler(async(req,res) =>{
	const {booktitle,bookauthor,bookdescription,editorsChoice,genre} = req.body;
	if(!booktitle || !bookdescription || !bookauthor || !genre){
		res.status(400)
		throw new Error('Please Fill all the fields')
	}
	if(!req.file){
		res.status(400)
		throw new Error("Please upload a image")
	}
	const file = req.file.filename;
	const fileUrl = `http://localhost:5000/books/${file}`;
	const title = booktitle.toLowerCase();
	const newBook = await Book.create({
		booktitle,
		bookauthor,
		bookdescription,
		editorsChoice,
		image:fileUrl,
		bookSlug:slugify(title),
		genre
	});
	const resultPerPage = 12;

	const countDoc = await Book.countDocuments();
	res.json({
		books:newBook,
		pages:Math.ceil(countDoc / resultPerPage)
	});
});

const getSingleBook = asyncHandler(async(req,res) =>{
	const {slug} = req.params;
	const book = await Book.findOne({bookSlug:slug})
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	if(!book){
		res.status(400)
		throw new Error('Book not found')
	}
	res.json(book)
});

const updateBook = asyncHandler(async(req,res) =>{
	const {id} = req.body;
	const book = await Book.findById(id);
	if(!book){
		res.status(400)
		throw new Error('Book Not Found');
	}
	const price = req.body.price ? req.body.price : book.price;
	const choice = req.body.editorsChoice ? req.body.editorsChoice : book.editorsChoice;
	const updateData = await book.save();
	res.json(updateData);
});

const deleteBook = asyncHandler(async(req,res) =>{
	const {id} = req.params;
	const book = await Book.findById(id);
	 if(!book){
    	res.status(400)
    	throw new Error('Book not found')
  	}
  	const file = book.image;
  	const filename = file.split('books/')[1];
  	fs.unlink(`/home/rahul/Projects/Mern/MyCodings/booksapp/server/public/books/${filename}`,(err)=>{
  		if(err) console.log(err);
  	});
  	await Book.deleteOne({_id:id});
  	res.json({message:'Book deleted successfully'})
})


module.exports = {
	getbooks,
	getSingleBook,
	uploadBook,
	updateBook,
	deleteBook
}