import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import {useDispatch} from 'react-redux';
import {uploadAuthor} from '../../actions/authorActions';

const AuthorModal = ({show,handleClose}) => {

	const dispatch = useDispatch();
	const {getInputProps,getRootProps,isDragActive} = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles:1,
		maxSize:5242880,
		onDrop:(acceptedFiles) =>{
			setImage(acceptedFiles[0]);
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	});

	useEffect(()=>{
		setDescription('');
		setAuthor('');
		setImage(null);
		setPreview(null);
	},[show])

	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [author, setAuthor] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = () =>{
			let formdata = new FormData();
			formdata.append('name',author);
			formdata.append('description',description);
			formdata.append('author',image);
			dispatch(uploadAuthor(formdata));
			setDescription('');
			setAuthor('');
			setImage(null);
			setPreview(null);
			handleClose();
	}

	return (
		<>
			<Modal show={show} onHide={handleClose}  
			     backdrop="static"
		        keyboard={false}>
			        <Modal.Header closeButton>
			          <Modal.Title>Upload Authors</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<div className="form-group">
			        		<label>Author Name</label>
			        		<input className="form-control"
			        		type="text" placeholder="author name"
			        		value={author}
			        		onChange={(e)=>setAuthor(e.target.value)}/>
			        	</div>
			        	<div className="form-group">
			        		<label>Description</label>
			        		<textarea className="form-control"
			        		placeholder="author description"
			        		value={description}
			        		onChange={(e)=>setDescription(e.target.value)}>
			        		</textarea>
			        	</div>
        			<label>Author Image</label>
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

export default AuthorModal