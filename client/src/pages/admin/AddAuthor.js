import React,{useState} from 'react'
import {Sidebar} from '../../components';
import './styles/AddAuthor.css';
import {useDropzone} from 'react-dropzone';
import {Link} from 'react-router-dom';

const AddAuthor = () => {

	const [addWidth,setAddWidth] = useState(false);
	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}

	const {getInputProps,getRootProps,isDragActive} = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles:1,
		maxSize:5242880,
		onDrop:(acceptedFiles) =>{
			setImage(acceptedFiles[0]);
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	});



	const [author, setAuthor] = useState('');
	const [desc, setDesc] = useState('')
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null)


	const handleSubmit = (e) =>{
		e.preventDefault();
		console.log(image,author,desc);
		setDesc('');
		setAuthor('');
		setImage(null);
		setPreview(null);
	}

	return (
		<div className="addauthor">
			<Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="addauthor__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn">Manage Authors</Link>
	            </div>
	            <div className="addauthor__main container-fluid mt-2">
	            	<div className="addauthor__form row">
	            		<div className="col-md-6 offset-md-3">
	            			<h4 className="text-muted text-center">Add Author</h4>
	            			<form onSubmit={handleSubmit}>
	            				<div className="form-group">
	            					<label htmlFor="authorName">Author Name</label>
	            					<input type="text" placeholder="author name"
	            					className="form-control"
	            					value={author}
	            					onChange={(e)=>setAuthor(e.target.value)}
	            					id="authorName"
	            					/>
	            				</div>
	            				<div className="form-group">
	            					<label>Author Description</label>
	            					<textarea className="form-control" placeholder="description"
	            					value={desc}
	            					onChange={(e)=>setDesc(e.target.value)}></textarea>
	            				</div>
		            			<label>Author Image</label>
		            			<div {...getRootProps({className: 'dropzone'})}>
		            				<input {...getInputProps()} />
		            				{
		            					isDragActive ? <p>Drop author Image Here...</p> : <p>Drag and Drop image here || click to choose file</p>
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
		            			<div className="mb-2 mt-2">
		            				<button className="btn btn-warning">Add Author</button>
		            			</div>            				
	            			</form>
	            		</div>
	            	</div>
	            </div>
		</div>
	)
}

export default AddAuthor