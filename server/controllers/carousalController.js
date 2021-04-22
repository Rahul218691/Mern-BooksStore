const asynchandler = require('express-async-handler');
const Carousal = require('../models/Carousal');
const fs = require('fs');

const addCarousal = asynchandler(async(req,res)=>{
	const {title,content} = req.body;
	if(!req.file){
		res.status(400)
        throw new Error('Please choose a image')
	}
	const file = req.file.filename;
	const fileUrl = `http://localhost:5000/carousal/${file}`;
	const newCarousal = await Carousal.create({
		title,
		content,
		image:fileUrl
	});
	// res.json({message:'Carousal Added Successfully'});
	res.json(newCarousal)
})


const getCarousals = asynchandler(async(req,res) =>{
	const carousal = await Carousal.find({});
	if(carousal){
		res.json(carousal)
	}
});

const updateCarousal = asynchandler(async(req,res)=>{
	const {id} = req.body;
	const carousal = await Carousal.findById(id);
	if(!carousal){
		res.status(400)
		throw new Error('Carousal Not Found');
	}
	if(!req.file){
		const title = req.body.title ? req.body.title : carousal.title;
		const content = req.body.content ? req.body.content : carousal.content;
		carousal.title = title;
		carousal.content = content;
		const updateData = await carousal.save();
		res.json(updateData);
	}else{
		const oldFile = carousal.image;
		const oldFileName = oldFile.split('carousal/')[1];
		const path = `/home/rahul/Projects/Mern/MyCodings/booksapp/server/public/carousal/${oldFileName}`;
        if(fs.existsSync(path)){
            fs.unlink(path,(err)=>{
                if(err) console.log(err)
            })
        }
        const title = req.body.title ? req.body.title : carousal.title;
		const content = req.body.content ? req.body.content : carousal.content;	
		const image = `http://localhost:5000/carousal/${req.file.filename}`;
		carousal.title = title;
		carousal.content = content;
		carousal.image = image;
		const newData = await carousal.save();
		res.json(newData);
	}
});

const deleteCarousal = asynchandler(async(req,res) =>{
	const {id} = req.params;
	const carousal = await Carousal.findById(id);
	 if(!carousal){
    	res.status(400)
    	throw new Error('Carousal not found')
  	}
  	const file = carousal.image;
  	const filename = file.split('carousal/')[1];
  	fs.unlink(`/home/rahul/Projects/Mern/MyCodings/booksapp/server/public/carousal/${filename}`,(err)=>{
  		if(err) console.log(err);
  	});
  	await Carousal.deleteOne({_id:id});
  	res.json({message:'Carousal deleted successfully'})
})

module.exports = {
	addCarousal,
	getCarousals,
	updateCarousal,
	deleteCarousal
}