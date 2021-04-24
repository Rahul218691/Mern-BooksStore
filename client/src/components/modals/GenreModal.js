import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import {useDispatch} from 'react-redux';
import {uploadGenre} from '../../actions/genreActions';

const GenreModal = ({show,handleClose}) => {

	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [title, setTitle] = useState('')

	const {getInputProps,getRootProps,isDragActive} = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles:1,
		maxSize:5242880,
		onDrop:(acceptedFiles) =>{
			setImage(acceptedFiles[0]);
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	});

	useEffect(() => {
		if(show){
			setImage(null);
			setPreview(null);
			setTitle('')
		}
	}, [show])

	const handleAddGenre = () =>{
		let formdata = new FormData();
		formdata.append('title',title);
		formdata.append('genres',image);
		dispatch(uploadGenre(formdata))
		setPreview(null);
		setImage(null);
		setTitle('');
		handleClose()
	}

	return (
		<>
		<Modal show={show} onHide={handleClose}  
		     backdrop="static"
	         keyboard={false}>
		        <Modal.Header closeButton>
		          <Modal.Title>Upload Genre</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<div className="form-group">
		        		<label htmlFor="title">Title</label>
		        		<input className="form-control" id="title" placeholder="genre title"
		        		value={title}
		        		onChange={(e)=>setTitle(e.target.value)}/>
		        	</div>
		        	<label>Genre Image</label>
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
		        </Modal.Body>
		        <Modal.Footer>
		          <Button variant="secondary" onClick={handleClose}>
		            Close
		          </Button>
		          <Button variant="primary" onClick={handleAddGenre}>
		            Submit
		          </Button>
		        </Modal.Footer>
		</Modal>			
		</>
	)
}

export default GenreModal