import React,{useState} from 'react'
import {Sidebar} from '../../components';
import './styles/CreateBlog.css';
import {useDropzone} from 'react-dropzone';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateBlog = () => {

	const {getInputProps,getRootProps,isDragActive} = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles:1,
		maxSize:5242880,
		onDrop:(acceptedFiles) =>{
			setImage(acceptedFiles[0]);
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	});

	const [title, setTitle] = useState('');
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null)
	const [addWidth,setAddWidth] = useState(false);
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('')

	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}
 	
 	const handleChange = (e,editor) =>{
 		const data = editor.getData();
 		setContent(data)
 	}

 	const handleFormSubmit = (e) =>{
 		e.preventDefault();
 		console.log(title,image,content,author)
 		setImage(null);
 		setContent('');
 		setPreview(null);
 		setAuthor('');
 		setTitle('')
 	}

	return (
		<>
			<div className="createBlog">
				 <Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="createBlog__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            </div>
	            <div className="createBlog__main container-fluid mt-2">
	            	<div className="createBlog__form row">
	            		<div className="col-md-6 offset-md-3">
	            			<h4 className="text-muted text-center">Create Blog</h4>
			            		<form onSubmit={handleFormSubmit}>
			            			<div className="form-group">
			            				<label htmlFor="blogtitle">Title</label>
			            				<input id="blogtitle" className="form-control" type="text" placeholder="blog title"
			            				value={title}
			            				onChange={(e)=>setTitle(e.target.value)}/>
			            			</div>
			            			<div className="form-group">
			            				<label htmlFor="author">Author</label>
			            				<input type="text" placeholder="author"
			            				value={author}
			            				onChange={(e)=>setAuthor(e.target.value)}
			            				className="form-control"
			            				id="author"
			            				list="datalistauthor"/>
			            				<datalist id="datalistauthor">
	            						    <option value="Edge" />
										    <option value="Firefox" />
										    <option value="Chrome" />
										    <option value="Opera" />
										    <option value="Safari" />
	            					</datalist>
			            			</div>
			            			<label>Blog Image</label>
			            			<div {...getRootProps({className: 'dropzone'})}>
			            				<input {...getInputProps()} />
			            				{
			            					isDragActive ? <p>Drop Blog Image Here...</p> : <p>Drag and Drop image here || click to choose file</p>
			            				}
			            			</div>
			            			{
			            				preview && (
			            					<>
			            					<p className="text-muted mb-0">Preview Image:</p>
			            					<img src={preview} width='300px' alt="" className="img-fluid"/>
			            					</>
			            				)
			            			}
			            			<div className="mt-2">
			            				<label>Blog Description</label>
			            				<CKEditor editor={ClassicEditor}
			            				data={content}
			            				onChange={handleChange}/>
			            			</div>
			            			<div className="mt-2 mb-2">
			            				<button className="btn btn-warning">Post Blog</button>
			            			</div>
			            		</form>
	            		</div>
	            	</div>
	            </div>
			</div>
		</>
	)
}

export default CreateBlog