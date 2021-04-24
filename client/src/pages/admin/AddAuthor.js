import React,{useState,useEffect} from 'react'
import {Sidebar,AuthorModal,Paginate} from '../../components';
import './styles/AddAuthor.css';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {fetchAuthors} from '../../actions/authorActions';

const AddAuthor = () => {
	const limitdata = 5;
	const dispatch = useDispatch();
	const {authors,numOfAuthors} = useSelector(state=>state.authorList);
	const [addWidth,setAddWidth] = useState(false);
	const [show, setShow] = useState(false);
	const [pagi, setPagi] = useState(1);
	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}

	const handleOpen = () =>{
		setShow(true)
	}

	const handleClose = () =>{
		setShow(false)
	}	

	const paginate = (pageNumber) =>{
		setPagi(pageNumber)
	}

	useEffect(() => {
		dispatch(fetchAuthors(pagi,limitdata))
	}, [dispatch,pagi])

	return (
		<div className="addauthor">
			<Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="addauthor__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn" onClick={()=>handleOpen()}>Add Authors</Link>
	            </div>
	            <div className="addauthor__main container-fluid mt-2">
	            	<table className="table table-bordered table-responsive-md">
					  <thead>
					    <tr>
					      <th scope="col">Name</th>
					      <th scope="col">Description</th>
					      <th scope="col">Image</th>
					      <th scope="col">Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					    {
					    	authors && authors.map((author,i) =>(
								<tr key={i}>
							      <td>{author.name}</td>
							      <td>{author.description}</td>
							      <td style={{cursor:'pointer'}}><img src={author.image} alt="" className="img-fluid" width="100" height="100"/></td>
							      <td className="action__btns"><span><i className="far fa-edit"></i></span><span><i className="far fa-trash-alt"></i></span></td>
							    </tr>
					    	))
					    }
					  </tbody>
					</table>
					<Paginate totalRec={numOfAuthors} perPage={5} paginate={paginate} pagi={pagi}/>
	            </div>
	            <AuthorModal show={show} handleClose={handleClose}/>

		</div>
	)
}

export default AddAuthor