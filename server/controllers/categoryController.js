const asyncHandler = require('express-async-handler');
const Book = require('../models/Books');


const categoryBooks = asyncHandler(async(req,res) =>{
	const sortBy = req.query.sort ? req.query.sort : '-createdAt';
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 16;
	const {slug} = req.params;
	const catbooks = await Book.find({tags:{"$regex":slug,"$options":"i"},publish:true})
	.populate('bookauthor','_id name slug')
	.populate('genre','_id title genreSlug')
	.select('-bookdescription -comments -createdAt -updatedAt -__v -file -editorsChoice -publish -downloads -tags')
	.skip((limit * page) - limit)
	.limit(limit)
	.sort(sortBy);
	const catbooksCount = catbooks.length;
	res.json({
		books:catbooks,
		currentPage:page,
		pages:Math.ceil(catbooksCount / limit),
		catbooksCount:catbooksCount
	});
});


module.exports = {
categoryBooks
}