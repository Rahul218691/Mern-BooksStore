const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');
const slugify = require('slugify');


const fetchBlogs = asyncHandler(async(req,res) =>{
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;
	const blogs = await Blog.find({}).populate('author','name')
	.skip((limit * page) - limit)
	.limit(limit)
	.sort('-createdAt');
	const numOfBlogs = await Blog.countDocuments();
	res.json({
		blogs:blogs,
		currentPage:page,
		pages:Math.ceil(numOfBlogs / limit),
		numOfBlogs:numOfBlogs
	});
});

const fetchBlog = asyncHandler(async(req,res) =>{
	const {slug} = req.params;
	const blog = await Blog.findOne({slug}).populate('author','name slug');
	if(!blog){
		res.status(400)
		throw new Error('Blog Not Found')
	}
	res.json(blog)
});

const uploadBlog = asyncHandler(async(req,res) =>{
	const {title,description,author} = req.body;
	if(!title || !description || !author){
		res.status(400)
		throw  new Error('Please Fill All the Fields');
	}
	if(!req.file){
		res.status(400)
		throw  new Error('Please Choose a Image');
	}
	const file = req.file.filename;
	const fileURL = `http://localhost:5000/blogs/${file}`;
	const lowertitle = title.toLowerCase();
	const newBlog = await Blog.create({
		title,
		description,
		author,
		image:fileURL,
		slug:slugify(lowertitle)
	});
	const data = await Blog.findOne({_id:newBlog._id}).populate('author','name');
	const resultPerPage = 5;
	const countDoc = await Blog.countDocuments();
	res.json({
		blogs:data,
		pages:Math.ceil(countDoc / resultPerPage)
	});
});

const deleteBlog = asyncHandler(async(req,res) =>{

});


module.exports = {
	fetchBlogs,
	fetchBlog,
	uploadBlog,
	deleteBlog
}