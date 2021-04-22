import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {uploadCarousal,updateCarousal,removeCarousal} from '../../actions/carousalActions';
import './styles.css';

const CarousalModal = ({show,handleClose,zoomImg,editshow,handleEditClose,deleteShow,handleDeleteClose,currentData,deleteId,imageShow,handleImageClose}) => {

	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [image, setImage] = useState('');
	const [preview, setPreview] = useState(null);
	const [id,setId] = useState('');

	const handleImage = (e) =>{
		setImage(e.target.files[0]);
		setPreview(URL.createObjectURL(e.target.files[0]))
	}

	const handleAddCarousal = () =>{
		let formdata = new FormData();
		formdata.append('title',title);
		formdata.append('content',desc);
		formdata.append('carousal',image);
		dispatch(uploadCarousal(formdata));
		setTitle('');
		setDesc('');
		setImage('');
		setPreview(null);
		handleClose();
	}

	const handleEditCarousal = () =>{
		let formdata = new FormData();
		formdata.append('title',title);
		formdata.append('content',desc);
		formdata.append('carousal',image);
		formdata.append('id',id);
		dispatch(updateCarousal(formdata));
		setTitle('');
		setDesc('');
		setImage('');
		setPreview(null);
		setId('')
		handleEditClose();

	}

	const handleDelete = () =>{
		dispatch(removeCarousal(id));
		setId('');
		handleDeleteClose();
	}

	useEffect(() => {
		if(currentData){
			setDesc(currentData.content);
			setTitle(currentData.title);
			setPreview(currentData.image);
			setId(currentData._id);
		}
	}, [currentData])

	useEffect(() => {
		if(show){
			setDesc('');
			setTitle('');
			setPreview(null);
		}
	}, [show]);

	useEffect(() => {
		setId(deleteId)
	}, [deleteId])

	useEffect(() => {
		if(zoomImg){
			setImage(zoomImg)
		}
	}, [zoomImg])

	return (
		<>
	      <Modal show={show} onHide={handleClose}  
	     backdrop="static"
        keyboard={false}>
	        <Modal.Header closeButton>
	          <Modal.Title>Upload Carousal</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<div className="form-group">
	        		<label htmlFor="title">Title</label>
	        		<input type="text" className="form-control" placeholder="title"
	        		value={title}
	        		onChange={(e)=>setTitle(e.target.value)}/>
	        	</div>
	        	<div className="form-group">
	        		<label htmlFor="description">Content</label>
	        		<textarea placeholder="short description" className="form-control"
	        		value={desc}
	        		onChange={(e)=>setDesc(e.target.value)}></textarea>
	        	</div>
	        	<div className="form-group">
	        		<label htmlFor="image">Carousal Image</label>
	        		<input type="file" accept="image/*" className="form-control"
	        		onChange={handleImage}/>
	        	</div>
	        	{
	        		preview && (
	        			<img src={preview} alt="" className="img-fluid" width="300" height="300"/>
	        		)
	        	}
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={handleAddCarousal}>
	            Submit
	          </Button>
	        </Modal.Footer>
	      </Modal>

	      <Modal show={editshow} onHide={handleEditClose}
	            backdrop="static"
        		keyboard={false}>
	        <Modal.Header closeButton>
	          <Modal.Title>Edit Carousal</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<div className="form-group">
	        		<label htmlFor="edittitle">Title</label>
	        		<input type="text" className="form-control" placeholder="title"
	        		value={title}
	        		onChange={(e)=>setTitle(e.target.value)}/>
	        	</div>
	        	<div className="form-group">
	        		<label htmlFor="editdescription">Content</label>
	        		<textarea placeholder="short description" className="form-control"
	        		value={desc}
	        		onChange={(e)=>setDesc(e.target.value)}></textarea>
	        	</div>
	        	<div className="form-group">
	        		<label htmlFor="image">Carousal Image</label>
	        		<input type="file" accept="image/*" className="form-control"
	        		onChange={handleImage}/>
	        	</div>
	        	{
	        		preview && (
	        			<img src={preview} alt="" className="img-fluid" width="300" height="300"/>
	        		)
	        	}
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleEditClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={handleEditCarousal}>
	            Submit
	          </Button>
	        </Modal.Footer>
	      </Modal>

	    <Modal show={deleteShow} onHide={handleDeleteClose}
	            backdrop="static"
        		keyboard={false}>
	        <Modal.Header closeButton>
	          <Modal.Title>Delete Carousal</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<h4>Are you sure you want to remove carousal?</h4>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleDeleteClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={handleDelete}>
	            Submit
	          </Button>
	        </Modal.Footer>
	    </Modal>	      

	    <Modal show={imageShow} onHide={handleImageClose}
	            backdrop="static"
        		keyboard={false}
        		centered>
	        <Modal.Header closeButton style={{borderBottom:'none'}}>
	        </Modal.Header>
	        <Modal.Body>
	        	<img className="zoomimage" src={image} alt="" style={{width:'100%'}}/>
	        </Modal.Body>
	    </Modal>	      	    

	    </>  
	)
}

export default CarousalModal