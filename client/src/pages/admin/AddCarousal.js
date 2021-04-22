import React,{useState,useEffect} from 'react'
import {Sidebar,CarousModal,Alert,Loading} from '../../components';
import {Link} from 'react-router-dom';
import './styles/AddCarousal.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchFiles} from '../../actions/carousalActions';
import {CAROUSAL_RESET} from '../../constants/carousalConstants';

const AddCarousal = () => {

	const dispatch = useDispatch();
	const {carousal,loading,error} = useSelector(state=>state.admincarousal);

	const [addWidth,setAddWidth] = useState(false);
		const toggleWidth = () =>{
			setAddWidth(!addWidth)
		}
	
	const [show, setShow] = useState(false);
	const [editshow, setEditShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false)
	const [currentData, setCurrentData] = useState('');
	const [deleteId,setDeleteId] = useState('');
	const [imageShow, setImageShow] = useState(false);
	const [zoomImg, setZoomImg] = useState('')

	const handleOpen = () =>{
		setShow(true)
	}
	const handleClose = () =>{
		setShow(false)
	}	

	const handleEditClose = () =>{
		setEditShow(false)
	}

	const handleEditOpen = (data) =>{
		setCurrentData(data);
		setEditShow(true)
	}

	const handleDeleteOpen = (id) =>{
		setDeleteId(id)
		setDeleteShow(true)
	}

	const handleImageClose = () =>{
		setImageShow(false);
	}

	const handleDeleteClose = () =>{
		setDeleteShow(false)
	}

	const handleImageOpen = (img) =>{
		setZoomImg(img);
		setImageShow(true);
	}

	if(error){
	    setTimeout(()=>dispatch({
	        type:CAROUSAL_RESET
	    }),2000);	
    }	


	useEffect(() => {
		dispatch(fetchFiles())
	}, [dispatch])

	return (
		<div className="addcarousal">
			<Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="addcarousal__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn" onClick={()=>handleOpen()}>Add Carousal</Link>
	            </div>
	            <div className="addcarousal__main container-fluid mt-4">
	            	{error && <Alert type="danger">{error}</Alert>}
                            {loading && <Loading />}
					<table className="table table-bordered table-responsive-md">
					  <thead>
					    <tr>
					      <th scope="col">Title</th>
					      <th scope="col">Description</th>
					      <th scope="col">Image</th>
					      <th scope="col">Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					  {
					  	carousal && carousal.map((data,i) =>(
						  	<tr key={i}>
						      <td>{data.title}</td>
						      <td>{data.content}</td>
						      <td style={{cursor:'pointer'}} onClick={(e)=>handleImageOpen(data.image)}><img src={data.image} alt="" className="img-fluid" width="300" height="300"/></td>
						      <td className="action__btns"><span onClick={(e)=>handleEditOpen(data)}><i className="far fa-edit"></i></span> <span onClick={(e)=>handleDeleteOpen(data._id)}><i className="far fa-trash-alt"></i></span></td>
						    </tr>
					  		))
					  }
					    
					  </tbody>
					</table>
	            </div>
	            <CarousModal deleteShow={deleteShow} handleDeleteClose={handleDeleteClose} show={show} handleClose={handleClose} editshow={editshow} handleEditClose={handleEditClose}
	            currentData={currentData} deleteId={deleteId}
	            imageShow={imageShow} handleImageClose={handleImageClose}
	            zoomImg={zoomImg}/>
		</div> 
	)
}

export default AddCarousal