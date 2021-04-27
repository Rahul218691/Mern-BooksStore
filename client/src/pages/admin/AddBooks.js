import React,{useState} from 'react'
import {Sidebar,BookModal} from '../../components';
import {Link} from 'react-router-dom';
import './styles/AddBooks.css';

const AddBooks = () => {

	const [addWidth,setAddWidth] = useState(false);
	const [show, setShow] = useState(false);
	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}

	const handleClose = () =>{
		setShow(false)
	}

	return (
		<div className="addbooks">
			<Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="addbooks__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn" onClick={()=>setShow(true)}>Add Books</Link>
	            </div>
	            <div className="addbooks__main container-fluid mt-4">
	            	<div className="addbooks__filter">
	            		<input type="text" placeholder="search books" className="mb-2 float-right"/>
	            	</div>
					<table className="table table-bordered table-responsive-md">
					  <thead>
					    <tr>
					      <th scope="col">Title</th>
					      <th scope="col">Author</th>
					      <th scope="col">Genre</th>
					      <th scope="col">Image</th>
					      <th scope="col">Editor's Choice</th>
					      <th scope="col">Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
					      <th scope="row">1</th>
					      <td>Mark</td>
					      <td>Otto</td>
					      <td>@mdo</td>
					    </tr>
					    <tr>
					      <th scope="row">2</th>
					      <td>Jacob</td>
					      <td>Thornton</td>
					      <td>@fat</td>
					    </tr>
					  </tbody>
					</table>
					<BookModal show={show} handleClose={handleClose}/>
	            </div>
		</div>
	)
}

export default AddBooks