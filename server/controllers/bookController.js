const asyncHandler = require('express-async-handler');
const Book = require('../models/Books');
const slugify = require('slugify');
const path = require('path')


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
	const {booktitle,bookauthor,bookdescription,editorsChoice,genre,tags} = req.body;
	if(!booktitle || !bookdescription || !bookauthor || !genre || !tags){
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
		genre,
		tags
	});
	const resultPerPage = 12;
	const data = await Book.findOne({_id:newBook._id})
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	const countDoc = await Book.countDocuments();
	res.json({
		books:data,
		pages:Math.ceil(countDoc / resultPerPage)
	});
});

const getSingleBook = asyncHandler(async(req,res) =>{
	const books = [];
	const {slug} = req.params;
	const book = await Book.findOne({bookSlug:slug})
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug')
	.populate('comments.user','_id name profile');
	if(!book){
		res.status(400)
		throw new Error('Book not found')
	}
	const bookId = book._id;
	const tags = book.tags.split(',');
	const similarBooks = await Book.find({publish:true})
	.sort('-createdAt')
	.populate('genre','_id genreSlug')
	.select('-bookdescription -comments -file -createdAt -updatedAt -__v -downloads -editorsChoice -tags -bookauthor -publish');
		
	for(let i=0;i<tags.length;i++){
		for(let j=0;j<similarBooks.length;j++){
			if(tags[i] === similarBooks[j].genre.genreSlug && similarBooks[j]._id.toString() !== bookId.toString()){
				books.push(similarBooks[j])
			}
		}
	}
	res.json({
		book:book,
		similar:books
	})
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


const bookPublish = asyncHandler(async(req,res) =>{
	const {id} = req.body;
	const book = await Book.findById(id);
	if(!book){
		res.status(400)
		throw new Error('Book not Found')
	}
	if(book.file === ''){
		res.status(400)
		throw new Error("Please upload book before publishing")
	}
	book.publish = !book.publish;
	const updatedBook =  await book.save();
	const bookUpdated = await Book.findById(updatedBook._id)
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	res.json(bookUpdated)
});	

const uploadbookPDF = asyncHandler(async(req,res) =>{
	const {id} = req.body;
	// console.log(req.file)
	if(!req.file){
		res.status(400)
		throw new Error('Please Choose a File')
	}
	const book = await Book.findById(id);
	if(!book){
		res.status(400)
		throw new Error('Book not found')
	}
	const file = req.file.filename;
	// console.log(file)
	const filedata = `http://localhost:5000/books/files/${file}`;
	book.file = filedata;
	const updated =  await book.save();
	const findBook = await Book.findById(updated._id)
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	res.json(findBook);
});

const editorBooks = asyncHandler(async(req,res) =>{
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 12;
	const book = await Book.find({editorsChoice:true,publish:true})
	.skip((limit * page) - limit)
	.limit(limit)
	.select('-bookdescription -createdAt -updatedAt -__v -file -comments -tags -downloads')
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	const numBooks = book.length;
	res.json({
		book:book,
		currentPage:page,
		pages:Math.ceil(numBooks / limit),
		numBooks:numBooks
	});
});

const newBooks = asyncHandler(async(req,res) =>{
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 12;
	const book = await Book.find({publish:true})
	.sort('-createdAt')
	.skip((limit * page) - limit)
	.limit(limit)
	.select('-bookdescription -createdAt -updatedAt -__v -file -comments -tags -downloads')
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	const numNewBooks = await Book.countDocuments();
	res.json({
		book:book,
		currentPage:page,
		pages:Math.ceil(numNewBooks / limit),
		numNewBooks:numNewBooks
	});
});

const classicBooks = asyncHandler(async(req,res) =>{
	const limit = parseInt(req.query.limit) || 12;
	const book = await Book.find({publish:true})
	.sort('-createdAt')
	.select('-bookdescription -createdAt -updatedAt -__v -file -comments -tags -downloads')
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug');
	const filterbooks = book.filter(x=>x.genre.title === 'CLASSICS');
	const limitArray = filterbooks.splice(0,limit);
	res.json(limitArray)
});

const downloadBook = asyncHandler(async(req,res) =>{
	const {bookid} = req.params;
	const book = await Book.findById(bookid);
	book.downloads = book.downloads + 1;
	await book.save();
	res.json({});
})

module.exports = {
	getbooks,
	getSingleBook,
	uploadBook,
	updateBook,
	deleteBook,
	bookPublish,
	uploadbookPDF,
	editorBooks,
	newBooks,
	classicBooks,
	downloadBook
}