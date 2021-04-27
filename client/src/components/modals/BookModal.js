import React,{useState} from 'react'
import {Modal,Button} from 'react-bootstrap';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDropzone} from 'react-dropzone';

const BookModal = ({show,handleClose}) => {

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('')
	const [genre, setGenre] = useState('');
	const [choice, setChoice] = useState(false);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null)

	const handleChange = (e,editor) =>{
 		const data = editor.getData();
 		setContent(data)
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

	const handleSubmit = () =>{
		console.log(image,choice)
		setImage(null);
		setPreview(null);
		setChoice(false);
		setTitle('');
		setContent('');
		setAuthor('');
		setGenre('');
		handleClose();
	}

	return (
		<>
			<Modal show={show} onHide={handleClose}  
			     backdrop="static"
		        keyboard={false}>
			        <Modal.Header closeButton>
			          <Modal.Title>Upload Books</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<div className="form-group">
			        		<label>Book Title</label>
			        		<input className="form-control"
			        		type="text" placeholder="book title"
			        		value={title}
			        		onChange={(e)=>setTitle(e.target.value)}/>
			        	</div>
			        	<div className="form-group">
			        		<label>Book Description</label>
							<CKEditor editor={ClassicEditor}
            				data={content}
            				onChange={handleChange}/>
			        	</div>
			        	<div className="form-group">
			        		<label>Author</label>
			        		<select className="form-control" value={author}
			        		 onChange={(e)=>setAuthor(e.target.value)}>
			        			<option value="opt1">Opt1</option>
			        			<option value="opt2">Opt1</option>
			        		</select>
			        	</div>
			        	<div className="form-group">
			        		<label>Genre</label>
			        		<select className="form-control" value={genre}
			        		 onChange={(e)=>setGenre(e.target.value)}>
			        			<option value="opt1">Opt1</option>
			        			<option value="opt2">Opt1</option>
			        		</select>
			        	</div>	
		        		 <div className="form-check">
						  <input className="form-check-input" type="checkbox" value={choice}
						  onChange={(e)=>setChoice(e.target.checked)}
						  id="defaultCheck1" />
						  <label className="form-check-label" htmlFor="defaultCheck1">
						    Editor's Choice
						  </label>
						</div> 
 						<label>Book Image</label>
            			<div {...getRootProps({className: 'dropzone'})}>
            				<input {...getInputProps()} />
            				{
            					isDragActive ? <p>Drop Book Image Here...</p> : <p>Drag and Drop image here || click to choose file</p>
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
			        </Modal.Body>
			        <Modal.Footer>
			          <Button variant="secondary" onClick={handleClose}>
			            Close
			          </Button>
			          <Button variant="primary" onClick={handleSubmit}>
			            Submit
			          </Button>
			        </Modal.Footer>
			</Modal>
		</>	
	)
}

export default BookModal