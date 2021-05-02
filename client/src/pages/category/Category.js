import React,{useState,useEffect} from 'react'
import './Category.css';
import Card from '../../components/booksections/Card';
import {Footer,Loading,Paginate} from '../../components';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchCatBooks} from '../../actions/catBookActions';

const Category = () => {

	const limitdata = 16;
	const {category} = useParams();
	const dispatch = useDispatch();
	const {books,loading,numOfBooks} = useSelector(state=>state.categorybooks);

	const [show, setShow] = useState(false);
	const [pagi, setPagi] = useState(1);

	const paginate = (pageNumber) =>{
		setPagi(pageNumber)
	}

	const handleChange = (e) =>{
		dispatch(fetchCatBooks(category,pagi,limitdata,e.target.value))
	}

	useEffect(() => {
		dispatch(fetchCatBooks(category,pagi))
	}, [dispatch,category,pagi])

	const filterComp = () =>{
		return(
				<div className="category__filter mb-2">
					<p>sort by:</p>
					<div className="category__radiobtn">
						<div className="form-group">
							<input type="radio" name="sort" value="-downloads" onChange={handleChange}/> {" "}
							<label>Popularity</label>
						</div>
						<div className="form-group">
							<input type="radio" name="sort" value="-comments.rating" onChange={handleChange}/> {" "}
							<label>Rating</label>					
						</div>
						<div className="form-group">
							<input type="radio" name="sort" value="createdAt" onChange={handleChange}/> {" "}
							<label>Older</label>					
						</div>
						<div className="form-group">
							<input type="radio" name="sort" value="-createdAt" onChange={handleChange}/> {" "}
							<label>Latest</label>					
						</div>
					</div>
					
				</div>
			)
	}


	return (
		<>
		<div className="category container mt-4">
			<div className="category__header">
				<h4 className="text-muted">{category && category.toUpperCase()}</h4>
				<button className="btn" onClick={()=>setShow(!show)}><i className="fas fa-filter"></i> {!show ? 'Filter' : 'Hide Filter'}</button>
			</div>
			{
				show && (
						filterComp()
					)
			}
			{loading && <Loading />}
			<div className="category__books mt-4">
				{
					books && books.map((book,i) =>(
							<Card key={i} data={book}/>
						))
				}
			</div>
			<Paginate paginate={paginate} pagi={pagi} totalRec={numOfBooks} perPage={limitdata}/>
		</div>
		<Footer />
		</>
	)
}

export default Category