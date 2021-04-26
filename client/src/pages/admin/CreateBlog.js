import React,{useState,useEffect} from 'react'
import {Sidebar,BlogModal,Loading,Paginate} from '../../components';
import './styles/CreateBlog.css';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {fetchBlogs} from '../../actions/blogActions';

const CreateBlog = () => {

	const limitdata = 5;
	const dispatch = useDispatch();
	const {loading,blogs,numOfBlogs} = useSelector(state=>state.blogs);
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
		dispatch(fetchBlogs(pagi,limitdata))
	}, [dispatch,pagi])

	return (
		<>
			<div className="createBlog">
				 <Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="createBlog__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn" onClick={()=>handleOpen()}>Create Blog</Link>
	            </div>
	            <div className="createBlog__main container-fluid mt-2">
	            {loading && <Loading />}
	            	<table className="table table-bordered table-responsive-md">
					  <thead>
					    <tr>
					      <th scope="col">Title</th>
					      <th scope="col">Description</th>
					      <th scope="col">Author</th>
					      <th scope="col">Image</th>
					      <th scope="col">Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					   { 
					    	blogs &&  blogs.map((blog,i) =>(
					    		<tr key={i}>
							      <td>{blog.title}</td>
							      <td className="descdata" dangerouslySetInnerHTML={{ __html: blog.description }}></td>
							      <td>{blog.author.name}</td>
							      <td style={{cursor:'pointer'}}><img src={blog.image} alt="" className="img-fluid" width="100" height="100"/></td>
							      <td className="action__btns"><span><i className="far fa-edit"></i></span><span><i className="far fa-trash-alt"></i></span></td>
							    </tr>
					    		))
					    }
					  </tbody>
					</table>
					<Paginate totalRec={numOfBlogs} perPage={5} paginate={paginate} pagi={pagi}/>
	            </div>
	      
	            <BlogModal show={show} handleClose={handleClose}/>
			</div>
		</>
	)
}

export default CreateBlog