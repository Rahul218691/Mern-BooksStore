import React,{useEffect,useState} from 'react'
import {Sidebar,Paginate,GenreModal} from '../../components';
import './styles/Genere.css';
import {useDispatch,useSelector} from 'react-redux';
import {fetchGenres} from '../../actions/genreActions';
import {Link} from 'react-router-dom';



const Genere = () => {

	const dispatch = useDispatch();
	const {genres,numOfGenres} = useSelector(state=>state.genresList);
	const [addWidth,setAddWidth] = useState(false);
	const [show, setShow] = useState(false);
	const [pagi, setPagi] = useState(1)
	const toggleWidth = () =>{
		setAddWidth(!addWidth)
	}

	const handleOpen = () =>{
		setShow(true)
	}

	const handleClose = () =>{
		setShow(false)
	}	

	useEffect(()=>{
		dispatch(fetchGenres(pagi));
	},[dispatch,pagi])

	const paginate = (pageNumber) =>{
		setPagi(pageNumber)
	}

	return (
		<div className="genere">
			<Sidebar addWidth={addWidth} toggleWidth={toggleWidth}/>
				<div className="genere__nav">
	            	<button className="btn" style={{fontSize:'30px'}} onClick={()=>toggleWidth()}>&#9776;</button>
	            	<Link to='#' className="float-right btn" onClick={()=>handleOpen()}>Add Genre</Link>
	            </div>
	            <div className="genere__main container-fluid mt-2">
					<table className="table table-bordered table-responsive-md">
					  <thead>
					    <tr>
					      <th scope="col">Title</th>
					      <th scope="col">Image</th>
					      <th scope="col">Actions</th>
					    </tr>
					  </thead>
					  <tbody>
					    {
					    	genres && genres.map((gen,i)=>(
						    	<tr key={i}>
							      <td>{gen.title}</td>
							      <td style={{cursor:'pointer'}}><img src={gen.poster} alt="" className="img-fluid" width="100" height="100"/></td>
							      <td className="action__btns"><span><i className="far fa-trash-alt"></i></span></td>
							    </tr>
					    	))
					    }
					  </tbody>
					</table>
					<Paginate totalRec={numOfGenres} paginate={paginate} pagi={pagi}/>
	            </div>
	            <GenreModal show={show} handleClose={handleClose}/>
		</div>
	)
}

export default Genere