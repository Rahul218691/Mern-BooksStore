import React,{useState,useEffect} from 'react'
import {Sidebar,BookModal,Loading,Paginate} from '../../components';
import {Link} from 'react-router-dom';
import './styles/AddBooks.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchBooks} from '../../actions/bookActions';

const AddBooks = () => {
	const limitdata = 12;
	const dispatch = useDispatch();
	const {books,loading,numOfBooks} = useSelector(state=>state.books);
	const [addWidth,setAddWidth] = useState(false);
	const [show, setShow] = useState(false);
	const [pagi, setPagi] = useState(1);
	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}

	const handleClose = () =>{
		setShow(false)
	}

	const paginate = (pageNumber) =>{
		setPagi(pageNumber)
	}

	useEffect(() => {
		dispatch(fetchBooks(pagi,limitdata));
	}, [dispatch,pagi])

	return (
		<div className="addbooks">
			<Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="addbooks__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn" onClick={()=>setShow(true)}>Add Books</Link>
	            </div>
	            <div className="addbooks__main container-fluid mt-4">
	            {loading && <Loading />}
	            	<div className="addbooks__filter">
	            		<input type="text" placeholder="search books" className="mb-2 float-right"/>
	            	</div>
					<table className="table table-bordered table-responsive-md">
					  <thead>
					    <tr>
					      <th scope="col">Title</th>
					      <th scope="col">Author</th>
					      <th scope="col">Genre</th>
					      <th scope="col">EditorChoice</th>
					      <th scope="col">Image</th>
					      <th scope="col">Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					    	{
					    		books && books.map((book,i) =>(
								    <tr key={i}>
								      <th>{book.booktitle}</th>
								      <td>{book?.bookauthor?.name}</td>
								      <td>{book?.genre?.title}</td>
								      <td className="text-center">{
								      	book?.editorsChoice ? (
								      		<i className="far fa-check-circle" style={{color:'green',fontSize:'30px'}}></i>
								      	) : (
								      		<i className="fas fa-times" style={{color:'red',fontSize:'30px'}}></i>
								      	)	
								      }</td>
								      <td style={{cursor:'pointer'}}><img src={book?.image} alt="" className="img-fluid" width="100" height="100"/></td>
								     <td className="action__btns"><span><i className="far fa-edit"></i></span> <span><i className="far fa-trash-alt"></i></span></td>
								    </tr>
					    		))
					    	}
					  </tbody>
					</table>
					<Paginate totalRec={numOfBooks} perPage={12} paginate={paginate} pagi={pagi}/>
					<BookModal show={show} handleClose={handleClose}/>
	            </div>
		</div>
	)
}

export default AddBooks