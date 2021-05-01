const mongoose = require('mongoose');
const Book = require('../models/Books');


const addComment = (msg) =>{
	return new Promise((resolve,reject) =>{
		if(!msg.bookslug) return false;
		try {	
				const book = Book.findOne({bookSlug:msg.bookslug})
				.select('_id')
				.then((data)=>{
					Book.findByIdAndUpdate(data._id,{
						$push:{
							comments:{
								user:msg.user,
								rating:msg.rating,
								comment:msg.comment
							}
						}
					},{
						new:true
					}).populate('comments.user','_id name profile')
					.then((result) =>{
						resolve({message:result.comments.pop(),slug:msg.bookslug})
					}).catch((error)=>{
						reject(error)
					})
				}).catch((error) =>{
					reject(error)
				})
			} catch(error) {
			console.log(error);
			reject(error)
		}
	})
}

module.exports = {
	addComment
}